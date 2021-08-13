import {Settings} from "../common/settings";
import * as electron from "electron";
import * as path from "path";
import * as fs from "fs";
import {Path, StorageDetails} from "../common/storage";
import {Image} from "../common/image";
const axios = require('axios')

let apiUrl = "https://production-gateway-dw7bzyro.ue.gateway.dev"

export function uploadImage(image: Image) {

    axios
        .post(apiUrl + "/image/upload", {
            name: image.name,
            data: image.data
        })
        .then((res: any) => {
            console.log(`statusCode: ${res.status}`)
            console.log(res)
        })
        .catch((error: any) => {
            console.error(error)
        })
}
