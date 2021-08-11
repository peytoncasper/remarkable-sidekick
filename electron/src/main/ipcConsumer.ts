import {GetDeviceStats} from "../messages/deviceStats";
import {GetSettings} from "../messages/settings";
import {Settings} from "../common/settings";

let settings = require("./settings");

export function handleIPCMessage(e: any, message: any) {
    console.log(message)

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
    console.log(message)
    settings.saveSettingsToFile(message)

    event.reply('asynchronous-reply', {
        type: "get_settings",
        deviceType: settings.deviceType,
        host: settings.host,
        username: settings.username,
        password: settings.password
    })
}
