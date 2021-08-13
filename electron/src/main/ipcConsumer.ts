import {GetDeviceStats} from "../messages/deviceStats";
import {GetSettings} from "../messages/settings";
import {Settings} from "../common/settings";
import {Connect} from "../common/remarkableConnection";
import {Image} from "../common/image";
import electron from "electron";
import path from "path";
import fs from "fs";

let settings = require("./settings");
let remarkable = require("./connection")

export function handleIPCMessage(e: any, message: any) {
    // console.debug(message)

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
        case "get_suspended_image":
            handleGetSuspendedScreen(e, message)
            break;
        case "get_local_images":
            handleGetLocalImages(e, message)
            break;
        case "save_image":
            handleSaveImage(e, message)
            break;
    }
}

function handleGetDeviceStats(event:any, message: GetDeviceStats) {
    console.log("Get Device Stats")
}

function handleGetSettings(event: any, message: GetSettings) {
    event.reply('asynchronous-reply', {
        type: "settings",
        deviceType: settings.deviceType,
        host: settings.host,
        username: settings.username,
        password: settings.password
    })
}

function handleSaveSettings(event: any, message: Settings) {
    settings.saveSettingsToFile(message)
}

function handleConnect(event: any, message: Connect) {
    if(!remarkable.connected) {
        remarkable.connect(settings)
    }
}

function handleGetSuspendedScreen(event: any, message: any) {
    remarkable.getSuspendedImage()
}

export function handleSaveImage(event: any, image: Image) {
    const userDataPath = electron.app.getPath('userData');
    const imageFolder = path.join(userDataPath, "/local_images/");

    if (!fs.existsSync(imageFolder)) {
        fs.mkdirSync(imageFolder)
    }

    fs.writeFileSync(imageFolder + image.name, image.data, 'base64')

    handleGetLocalImages(event, image)
}

function handleGetLocalImages(event: any, message: any) {
    const userDataPath = electron.app.getPath('userData');
    const localImages = path.join(userDataPath, "/local_images/");

    fs.readdir(localImages, (err, files) => {
        let images: Image[] = []

        const currentImagePath = path.join(userDataPath, "currentLockscreen.png");
        const currentImage = fs.readFileSync(currentImagePath, 'base64')
        images.push({
            type: "image",
            name: "currentLockscreen.png",
            data: currentImage
        })

        files.forEach(p => {
            const file = fs.readFileSync(localImages + p, 'base64')
            const name = path.parse(localImages + p).name

            images.push({
                type: "image",
                name: name,
                data: file
            })
        });
        global.browserWindow.webContents.send('asynchronous-message', {
            type: "local_images",
            images
        });
    });
}
