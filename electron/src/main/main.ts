import {handleIPCMessage, handleSaveImage, saveImage} from "./ipcConsumer";
const { app, BrowserWindow } = require('electron')
import * as url from 'url';
const path = require('path')
const { ipcMain } = require('electron')
const defaultRemarkableImage = "../assets/default_remarkable_lockscreen";

export function createWindow() {
    return new BrowserWindow({
        height: 950,
        width: 1440,
        webPreferences: {
            webSecurity: true,
            // devTools: process.env.NODE_ENV !== 'production',
            devTools: true,
            preload: path.resolve(__dirname, 'preload.bundle.js'),
            worldSafeExecuteJavaScript: true,
            contextIsolation: true,
        },
    });
}


app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {


    const window = createWindow()

    ipcMain.on('synchronous-message', handleIPCMessage)
    ipcMain.on('asynchronous-message', handleIPCMessage)

    window.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true,
        }),
    ).finally(() => { /* no action */ });

    global.browserWindow = window

    // installExtension(REACT_DEVELOPER_TOOLS)
    //     .then((name) => console.log(`Added Extension:  ${name}`))
    //     .catch((err) => console.log('An error occurred: ', err));
    // ssh.connect({
    //     host: 'remarkable',
    //     username: 'root',
    //     password: 'HDi5qA1DDD',
    // }).then(() => {
    //     ssh.execCommand('ls', { cwd:'/' }).then(function(result) {
    //         console.log('STDOUT: ' + result.stdout)
    //         console.log('STDERR: ' + result.stderr)
    //     })
    // })
})
