import * as fs from "fs";
import {FileObject, IndexEntry, ObjectMetadata} from "../common/file";
import electron from "electron";
import path from "path";
import {sendError} from "./ipcConsumer";

let index: Map<string, FileObject>
let indexLoaded: boolean = false

export function getIndex(error: (error: any) => void) {
    if (indexLoaded) {
        global.browserWindow.webContents.send('asynchronous-message', {
            type: "get_index",
            index: index
        });
    } else {
        loadIndex().then(() => {

            global.browserWindow.webContents.send('asynchronous-message', {
                type: "get_index",
                index: index
            });
        }).catch(error)
    }
    return index
}

export async function loadIndex() {
    const userDataPath = electron.app.getPath('userData');
    const indexPath = path.join(userDataPath, "remarkable-sidekick/index.json");

    if(fs.existsSync(indexPath)) {
        fs.readFile(indexPath, 'utf8' , (err, data) => {
            if (err) {
                console.error(err)
                return
            }

            index = new Map<string, FileObject>(Object.entries(JSON.parse(data)))
            indexLoaded = true
        })
    } else {
        index = new Map<string, FileObject>()
    }

    console.debug("successfully loaded index from disk")

}

export async function saveIndex(updatedIndex: Map<string, FileObject>) {
    const userDataPath = electron.app.getPath('userData');
    const indexPath = path.join(userDataPath, "remarkable-sidekick/index.json");

    const data = JSON.stringify(Object.fromEntries(updatedIndex))

    fs.writeFile(indexPath, data, err => {
        if (err != null) {
            console.error("error saving remarkable index ", err)
        }
    })

    console.debug("successfully saved remarkable index")
}
