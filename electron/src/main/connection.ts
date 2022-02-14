import {Settings} from "../common/settings";
import * as electron from "electron";
import * as path from "path";
import * as fs from "fs";
import {Path, StorageDetails} from "../common/storage";
import {sendError, sendSuccess} from "./ipcConsumer";
import log from "electron-log";
import {FileObject, ObjectMetadata} from "../common/file";
import {loadIndex, saveIndex} from "./index";
import Timeout = NodeJS.Timeout;
import {syncLockscreen} from "./lockscreen";

const {NodeSSH} = require('node-ssh')

let settings:           Settings
let ssh:                typeof NodeSSH
let status:             string = "disconnected"
let storage:            StorageDetails[]
let userFiles:          Map<string, FileObject>
let connectionMonitor:  Timeout


export function connect(s: Settings) {
    settings = s

    if (ssh == undefined) {
        ssh = new NodeSSH()
    }

    updateStatus("connecting")

    ssh.connect({
        host: settings.host,
        username: settings.username,
        password: settings.password,
        readyTimeout: 3500,
        keepaliveInterval: 500,
        keepaliveCountMax: 1
    }).then(() => {
        updateStatus("syncing")
        ssh.connection.on("error", disconnect)


        syncRemarkable()

        // getLockscreenImage()
        //
        // getStorageStats()
        //
        // indexUserFiles()

    }).catch((error: any) => {
        log.log(error)
        disconnect()
    })


}
export async function getLockscreenImage(localPath: string): Promise<void | Error> {
    if (ssh.isConnected()) {
        log.debug("syncing lockscreen")

        const remoteLockscreen = "/usr/share/remarkable/suspended.png"
        return ssh.getFile(localPath, remoteLockscreen)
    } else {
        disconnect()
    }

}

export function changeSuspendedImage(localImagePath: string, success: () => void, error: (error: any) => void): boolean {
    if (ssh && ssh.isConnected()) {
        const remoteLockscreen = "/usr/share/remarkable/suspended.png"

        ssh.putFile(localImagePath, remoteLockscreen)
            .then(success)
            .catch(error)

    } else {
        disconnect()
    }

    return false

}

export async function getStorageStats() {
    if (ssh.isConnected()) {
        ssh.exec('df', [], {
            cwd: '/',
            stream: 'stdout'
        }).then(function (result: string) {

            const output = result.split('\n').map((line) => {
                return line.split(" ").filter((word) => {
                    if(word != ' ')
                        return word
                })
            })

            let paths: Path[] = []

            let usedSpace = 0
            let availableSpace = 0

            for (let i = 1; i < output.length; i++) {
                const o = output[i]
                const pathUsed = parseFloat(o[2])
                const pathAvailable = parseFloat(o[3])

                usedSpace += pathUsed
                availableSpace += pathAvailable

                paths.push({
                    used:       pathUsed,
                    available:  pathAvailable,
                    path:       o[5],

                })
            }

            global.browserWindow.webContents.send('asynchronous-message', {
                type: "storage_details",
                used: usedSpace,
                available: availableSpace,
                paths
            });

        })
    } else {
        disconnect()
    }
}

function disconnect(): Error {
    updateStatus("disconnected")
    return Error("remarkable device disconnected")
}

export function updateStatus(s: string) {
    if (status == "connecting" && s == "disconnected") {
        const msg = "No Remarkable Device Found"
        log.error(msg)
        sendError(msg, 2500)
    } else if (status == "connected" && s == "disconnected") {
        const msg = "Remarkable Disconnected"
        log.error(msg)
        sendError(msg, 2500)
    } else if (s == "syncing") {
        const msg = "Syncing Remarkable Data"
        log.debug(msg)
        sendSuccess(msg, 2500)
    }

    status = s

    global.browserWindow.webContents.send('asynchronous-message', {
        type: "connection_status",
        status
    });
}

export function reboot() {
    if (ssh.isConnected()) {
        ssh.exec('systemctl', ['restart', 'xochitl'], {
            cwd: '/',
            stream: 'stdout'
        }).then(function (result: string) {
            disconnect()
        }).catch(function(error: any) {
            const msg = "error rebooting Remarkable device"
            log.error(msg, error)
            sendError(msg, error)
        })
    } else {
        disconnect()
    }
}

export async function syncRemarkable() {


    const indexPromise = indexUserFiles()
    const lockscreenPromise = syncLockscreen()
    const storagePromise = getStorageStats()

    await Promise.all([indexPromise, lockscreenPromise, storagePromise])

    updateStatus("connected")
}

export async function indexUserFiles() {
    if (ssh.isConnected()) {
        const objects = await getObjects()
            .catch(error => error)
            .then(value => value)

        // console.log(objects)

        for (const key of objects.keys()) {
            let object = objects.get(key)

            object.metadata = await getObjectMetadata(object.id)
                .catch(error => error)
                .then((result: ObjectMetadata) => {
                    return result
                })

            const highlights = await getObjectHighlights(object.id)

            if (highlights instanceof Error) {
                continue
            }

            object.highlights = highlights
            objects.set(key, object)
        }

        userFiles = objects

        saveIndex(objects)

        global.browserWindow.webContents.send('asynchronous-message', {
            type: "get_index",
            index: userFiles
        });

    } else {
        disconnect()
    }
}

async function saveUserFilesIndex() {
    const userDataPath = electron.app.getPath('userData');
    const deviceIndexPath = path.join(userDataPath, "deviceIndex.png");
}

async function parseRemarkableFileMetadata(filename: string): Promise<string | undefined> {
    if (ssh.isConnected()) {
        return ssh.exec('cat', [filename], {
            cwd: '/home/root/.local/share/remarkable/xochitl',
            stream: 'stdout'
        }).then(function(content: string) {
            return content
        })
    } else {
        disconnect()
    }
}

async function parseRemarkableHighlight(id: string, filename: string): Promise<string | undefined> {
    if (ssh.isConnected()) {
        return ssh.exec('cat', [filename], {
            cwd: '/home/root/.local/share/remarkable/xochitl/' + id + ".highlights",
            stream: 'stdout'
        }).then(function(content: string) {
            return content
        })
    } else {
        disconnect()
    }
}

async function cat(cwd: string, path: string): Promise<string | Error> {
    if (ssh.isConnected()) {
        return ssh.exec('cat', [path], {
            cwd: cwd,
            stream: 'stdout'
        })
            .then((lines: string) => {
                return lines
            })
            .catch((error: Error) => {
                return error;
            })
    } else {
        return disconnect()
    }
}

async function ls(cwd: string, path: string): Promise<string[] | Error> {
    if (ssh.isConnected()) {
        return ssh.exec('ls', [path], {
            cwd: cwd,
            stream: 'stdout'
        })
        .then((lines: string) => {
            return lines.split("\n")
        })
        .catch((error: Error) => {
            return error;
        })
    } else {
        return disconnect()
    }
}

export async function getObjects(): Promise<Map<string, FileObject> | Error> {
    if (ssh.isConnected()) {
        let objects: Map<string, FileObject> = new Map<string, FileObject>();
        await ls("/home/root/.local/share/remarkable/xochitl", "")
            .catch(error => error)
            .then(function filterIds(output: string[]) {
                output.forEach((line: string) => {
                    const extension = path.extname(line)
                    const fileId = path.basename(line, extension)

                    let o = objects.get(fileId)

                    if(o == undefined)
                    {
                        o = {
                            id: fileId,
                            type: "",
                            extension: "",
                            hasHighlights: false,
                            highlights: [],
                        }
                    }

                    if(extension == ".highlights") {
                        o.hasHighlights = true
                    } else if (extension == ".epub") {
                        o.extension = extension
                        o.type = "ebook"
                    } else if (extension == ".pdf" && o.extension != ".epub") {
                        o.extension = extension
                        o.type = "pdf"
                    }

                    objects.set(fileId, o)
                })
            })

        return objects

    } else {
        return disconnect()
    }
}

export async function getObjectMetadata(id: string): Promise<ObjectMetadata | Error> {
    if (ssh.isConnected()) {
        return ssh.exec('cat', [id + ".metadata"], {
            cwd: '/home/root/.local/share/remarkable/xochitl',
            stream: 'stdout'
        }).then(function(content: string) {
            const parsedContent = JSON.parse(content)
            let metadata: ObjectMetadata = {
                id: id,
                deleted: parsedContent["deleted"],
                lastModified: new Date(parsedContent["lastModified"]),
                lastOpened: new Date(parsedContent["lastOpened"]),
                lastOpenedPage: parsedContent["lastOpenedPage"],
                metadataModified: parsedContent["metadatamodified"],
                modified: parsedContent["modified"],
                parentId: parsedContent["parent"],
                pinned: parsedContent["pinned"],
                synced: parsedContent["synced"],
                type: parsedContent["type"],
                version: parsedContent["version"],
                name: parsedContent["visibleName"]

            }

            return metadata
        })
    } else {
        return disconnect()
    }
}

export async function getObjectHighlights(id: string): Promise<string[] | Error> {
    if (ssh.isConnected()) {
        const highlightFolder = id + ".highlights"

        let highlights: string[] = []
        let highlightFiles = await ls("/home/root/.local/share/remarkable/xochitl", highlightFolder)

        if (highlightFiles instanceof Error) {
            return highlightFiles
        }

        for (const filename of highlightFiles) {

            highlights.push(await cat("/home/root/.local/share/remarkable/xochitl", highlightFolder + "/" + filename)
                .catch(error => {
                    log.error(error)
                    return ""
                })
                .then(content => {
                    if(typeof content === 'string') {
                        const highlight = JSON.parse(content)

                        return highlight["highlights"].flatMap((value: any) => {
                            return value.flatMap((value: any) => {
                                return value["text"]
                            }).join(" ")
                        })[0]
                    } else {
                        return ""
                    }

                }))
        }

        return highlights
    } else {
        return disconnect()
    }
}

