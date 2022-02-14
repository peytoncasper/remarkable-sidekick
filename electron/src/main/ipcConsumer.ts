import {GetDeviceStats} from "../messages/deviceStats";
import {GetSettings} from "../messages/settings";
import {Settings} from "../common/settings";
import {Connect} from "../common/remarkableConnection";
import {Image} from "../common/image";
import electron from "electron";
import path from "path";
import fs from "fs";
import {uploadImage} from "./api";
import {changeSuspendedImage, reboot, updateStatus} from "./connection";
import {getIndex} from "./index";
import {initLockscreenData, syncLockscreen} from "./lockscreen";
import {homeDir, initSettings, sendSettings} from "./settings";
const defaultRemarkableImage = path.join(homeDir, "default_remarkable_lockscreen.png");

const log = require('electron-log');
const sharp = require('sharp');

let settings = require("./settings");
let remarkable = require("./connection")

export function handleIPCMessage(e: any, message: any) {
    switch(message.type) {
        case "get_device_settings":
            handleGetDeviceStats(e, message)
            break;
        case "get_settings":
            handleGetSettings(e, message)
            break;
        case "save_settings":
            handleSaveSettings(e, message)
            break;
        case "connect":
            handleConnect(e, message)
            break;
        case "init":
            handleInit()
            break;
        case "get_lockscreen_image":
            syncLockscreen()
            break;
        case "get_local_images":
            handleGetLocalImages(e, message)
            break;
        case "save_image":
            handleSaveImage(e, message)
            break;
        case "upload_image":
            handleUploadImage(e, message)
            break;
        case "change_lockscreen":
            handleChangeLockscreen(e, message)
            break;
        case "revert_to_default_lockscreen":
            handleRevertToDefaultLockscreen(e, message)
            break;
        case "get_index":
            handleGetIndex(e, message)
            break;
    }
}

function handleInit() {
    fs.copyFileSync(path.join(electron.app.getAppPath(), "default_remarkable_lockscreen.png"), path.join(homeDir, "default_remarkable_lockscreen.png"))

    initLockscreenData()
    initSettings()
}

function handleGetDeviceStats(event:any, message: GetDeviceStats) {
    console.log("Get Device Stats")
}

function handleGetSettings(event: any, message: GetSettings) {
    sendSettings()
}

function handleSaveSettings(event: any, message: Settings) {
    settings.saveSettingsToFile(message)
    sendSuccess("Settings saved successfully!", 1000)
}

function handleConnect(event: any, message: Connect) {
    if(!remarkable.connected) {
        remarkable.connect(settings)
    }
}

export function handleSaveImage(event: any, image: Image) {
    saveImage(image)
}

export function saveImage(image: Image) {
    const userDataPath = electron.app.getPath('userData');
    const imageFolder = path.join(userDataPath, "/local_images/");

    if (!fs.existsSync(imageFolder)) {
        fs.mkdirSync(imageFolder)
    }

    const fileName = imageFolder + image.name

    let imgBuffer = Buffer.from(image.data, 'base64');
    sharp(imgBuffer)
        .resize(1404, 1872)
        .png({quality: 30})
        .greyscale(true)
        .toBuffer()
        .then((b: Buffer) => {
            fs.writeFileSync(fileName, b)
            handleGetLocalImages("", image)
        }).catch((error: any) => {
            const msg = "error adding image"
            log.error(msg, error)
            sendError(msg, 4000)
        })


}

function handleGetLocalImages(event: any, message: any) {
    const userDataPath = electron.app.getPath('userData');
    const localImages = path.join(userDataPath, "/local_images/");

    fs.readdir(localImages, async (err, files) => {
        let images: Image[] = []

        const currentImagePath = path.join(userDataPath, "currentLockscreen.png");

        if (fs.existsSync(currentImagePath)) {
            const currentImage = fs.readFileSync(currentImagePath, 'base64')
            images.push({
                type: "image",
                name: "currentLockscreen.png",
                data: currentImage
            })
        }

        for (const p of files) {
            const imagePath = path.parse(localImages + p)

            await sharp(localImages + p)
                .resize(250, 333)
                .toBuffer()
                .then((b: Buffer) => {
                    images.push({
                        type: "image",
                        name: imagePath.name + imagePath.ext,
                        data: b.toString("base64")
                    })
                })

        }

        global.browserWindow.webContents.send('asynchronous-message', {
            type: "local_images",
            images
        });
    });
}

function handleUploadImage(event: any, message: any) {
    const userDataPath = electron.app.getPath('userData');
    const currentImagePath = path.join(userDataPath, "currentLockscreen.png");
    const currentImage = fs.readFileSync(currentImagePath, 'base64')

    uploadImage({
        type: "image",
        name: "currentLockscreen.png",
        data: currentImage
    })
}

function handleChangeLockscreen(event: any, image: Image) {
    const userDataPath = electron.app.getPath('userData');
    const lockscreenPath = path.join(userDataPath, "/local_images/" + image.name);

    fs.writeFileSync(lockscreenPath, image.data)

    changeSuspendedImage(
        lockscreenPath,
        () => {
            // getSuspendedImage().then(() => {
            //     handleGetLocalImages("", "")
            // })
            reboot()
        },
        (error: any) => {
            const msg = "error updating lockscreen"
            log.error(msg, error)
            sendError(msg, 2500)
        }
    )

}

function handleRevertToDefaultLockscreen(event: any, message: any) {
    changeSuspendedImage(
        defaultRemarkableImage,
        () => {
            // getSuspendedImage().then(() => {
            //     handleGetLocalImages("", "")
            reboot()
            // })

            sendSuccess("Successfully reverted to the default lockscreen")
        },
        (error: any) => {
            const msg = "Error reverting to default lockscreen"
            log.error(msg, error)
            sendError(msg, 2500)
        }
    )
}

function handleGetIndex(event: any, message: any) {
    getIndex(
        (error: any) => {
            const msg = "error loading index from disk"
            log.error(msg, error)
            sendError(msg, 2500)
        }
    )
}

export function sendError(message: string, timeout?: number) {

    global.browserWindow.webContents.send('asynchronous-message', {
        type: "error",
        message: message,
        timeout: timeout ? timeout : 5000
    });
}

export function sendSuccess(message: string, timeout?: number) {

    global.browserWindow.webContents.send('asynchronous-message', {
        type: "success",
        message: message,
        timeout: timeout ? timeout : 5000
    });
}
