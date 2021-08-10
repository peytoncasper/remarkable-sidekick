const { app, BrowserWindow } = require('electron')
const fs = require('fs')
import * as url from 'url';
const path = require('path')

function createWindow () {
    let mainWindow = new BrowserWindow({
        height: 950,
        width: 1440,
        webPreferences: {
            webSecurity: false,
            devTools: process.env.NODE_ENV !== 'production',
        },
    });

    mainWindow.loadURL(
        url.format({
            pathname: path.join(__dirname, './index.html'),
            protocol: 'file:',
            slashes: true,
        }),
    ).finally(() => { /* no action */ });
}

//

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') app.quit()
})

app.whenReady().then(() => {
    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

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
