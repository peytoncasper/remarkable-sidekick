import {RemarkableDevice, Settings} from "../common/settings";

const electron = require('electron');
const path = require('path');
const fs = require('fs');

export let deviceType: RemarkableDevice
export let host: string
export let username: string
export let password: string

function loadSettingsFromFile() {
    const userDataPath = electron.app.getPath('userData');
    const settingsPath = path.join(userDataPath, "settings.json");

    try {
        const s = JSON.parse(fs.readFileSync(settingsPath));

        deviceType = s.deviceType
        host = s.host
        username = s.username
        password = s.password
    } catch(error) {
        deviceType = ""
        host = ""
        username = ""
        password = ""
    }
}

export function saveSettingsToFile(settings: Settings) {
    deviceType = settings.deviceType
    host = settings.host
    username = settings.username
    password = settings.password

    const userDataPath = electron.app.getPath('userData');
    const settingsPath = path.join(userDataPath, "settings.json");

    fs.writeFileSync(settingsPath, JSON.stringify(settings))
}

loadSettingsFromFile()
