
const { ipcRenderer, contextBridge } = require('electron');

// window.addEventListener('DOMContentLoaded', () => {
//     const replaceText = (selector: string, text: any) => {
//         const element = document.getElementById(selector)
//         if (element) element.innerText = text
//     }
//
//     for (const dependency of ['chrome', 'node', 'electron']) {
//         replaceText(`${dependency}-version`, (process.versions[dependency] as string));
//     }
// })

contextBridge.exposeInMainWorld('api', {
    sendAsynchronousMessage: (message) => {
        ipcRenderer.send("asynchronous-message", message)
    },
    sendSynchronousMessage: (message) => {
        return ipcRenderer.sendSync("synchronous-message", message)
    },
    subscribeAsynchronousReply: (callback) => {
        ipcRenderer.on("asynchronous-reply", callback)
    },
    subscribeSynchronousReply: (callback) => {
        ipcRenderer.on("synchronous-reply", callback)
    },
    subscribeAsynchronousMessage: (callback) => {
        ipcRenderer.on("asynchronous-message", callback)
    },
    disconnect: (callback) => {
        ipcRenderer.removeAllListeners("asynchronous-reply")
        ipcRenderer.removeAllListeners("asynchronous-message")
        ipcRenderer.removeAllListeners("synchronous-reply")
        ipcRenderer.removeAllListeners("synchronous-message")
    },
})

export {}
