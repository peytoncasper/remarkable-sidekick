import {GetDeviceStats} from "../messages/deviceStats";
import {GetSettings} from "../messages/settings";
import {Settings} from "../common/settings";
import {Connect} from "../common/remarkableConnection";

let settings = require("./settings");
let remarkable = require("./connection")

export function handleIPCMessage(e: any, message: any) {
    console.debug(message)

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
