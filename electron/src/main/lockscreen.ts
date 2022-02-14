import fs from "fs";
import path from "path";
import electron from "electron";
import {sendError} from "./ipcConsumer";
import {homeDir} from "./settings";
import {LockscreenImage} from "../common/lockscreen";
import log from "electron-log";

let remarkable = require("./connection")

const defaultRemarkableImage = path.join(homeDir, "default_remarkable_lockscreen.png");
const userLockScreenPath = path.join(homeDir, "userLockscreen.png")

let lockscreenImage = ""
let lockscreenLoaded = false
let lockscreenSynced = false
let lockscreenLastSynced = new Date()

export async function syncLockscreen() {
    remarkable.getLockscreenImage(userLockScreenPath).then(() => {
        loadImage(userLockScreenPath)
    }).catch((err: Error) => {
        log.error("error syncing lockscreen image ", err)
    })
}

export function initLockscreenData() {

    if(fs.existsSync(userLockScreenPath)) {
        fs.stat(userLockScreenPath, (err, stats) => {
            if(err) {
                log.error("error getting stats for user lockscreen image ", err)
            }
            lockscreenLastSynced = stats.mtime
            sendLockscreenImage()
        });

        loadImage(userLockScreenPath)


    } else {
        loadImage(defaultRemarkableImage)
    }
}


function loadImage(path: string) {
    fs.readFile(path, {encoding: 'base64'},(err, data) => {
        if(err) {
            log.error("error reading user lockscreen image", err)
            sendError("Error Loading Lockscreen")
        }

        lockscreenLoaded = true
        lockscreenImage = data
        sendLockscreenImage()
    })
}

function sendLockscreenImage() {

    const message: LockscreenImage = {
        type: "lockscreen_image",
        name: "userLockscreen.png",
        data: lockscreenImage,
        lockscreenLoaded: lockscreenLoaded,
        lockscreenSynced: lockscreenSynced,
        lockscreenLastSynced: lockscreenLastSynced
    }

    global.browserWindow.webContents.send('asynchronous-message', message);

}
