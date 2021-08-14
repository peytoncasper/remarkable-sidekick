import {Settings} from "../common/settings";
import * as electron from "electron";
import * as path from "path";
import * as fs from "fs";
import {Path, StorageDetails} from "../common/storage";
import {Image} from "../common/image";
import Timeout = NodeJS.Timeout;
const {NodeSSH} = require('node-ssh')

let settings:           Settings
let ssh:                typeof NodeSSH
let status:             string = "disconnected"
let storage:            StorageDetails[]
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
        readyTimeout: 500,
        keepaliveInterval: 500,
        keepaliveCountMax: 1
    }).then(() => {
        updateStatus("connected")

        ssh.connection.on("error", disconnect)

        getSuspendedImage()
        getStorageStats()
    }).catch((error: any) => {
        disconnect()
    })


}

export function getSuspendedImage() {
    if (ssh.isConnected()) {
        const userDataPath = electron.app.getPath('userData');
        const localLockscreen = path.join(userDataPath, "currentLockscreen.png");

        const remoteLockscreen = "/usr/share/remarkable/suspended.png"

        ssh.getFile(localLockscreen, remoteLockscreen).then(function() {
            console.debug("successfully download the suspended image")
            const img = fs.readFileSync(localLockscreen, {encoding: 'base64'})

            global.browserWindow.webContents.send('asynchronous-message', {
                type: "suspended_image",
                name: "suspended.png",
                data: img
            });

        }, function(error: any) {
            console.error("error downloading the suspended image")
            console.log(error)
        })
    } else {
        disconnect()
    }

}

export function getStorageStats() {
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

function disconnect() {
    updateStatus("disconnected")
}

function updateStatus(s: string) {
    status = s

    global.browserWindow.webContents.send('asynchronous-message', {
        type: "connection_status",
        status
    });
}



