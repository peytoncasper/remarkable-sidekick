const { app, BrowserWindow } = require('electron')
const fs = require('fs')
const path = require('path')
const {NodeSSH} = require('node-ssh')

const ssh = new NodeSSH()

function createWindow () {
    const win = new BrowserWindow({
        width: 1440,
        height: 900
    })

    win.loadFile('./src/public/index.html')
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


    ssh.connect({
        host: 'remarkable',
        username: 'root',
        password: 'HDi5qA1DDD',
    }).then(() => {
        ssh.execCommand('ls', { cwd:'/' }).then(function(result) {
            console.log('STDOUT: ' + result.stdout)
            console.log('STDERR: ' + result.stderr)
        })
    })
})
