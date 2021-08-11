import {IPCHandler} from "../renderer/IPCConsumer";
import {Settings} from "../common/settings";
const {NodeSSH} = require('node-ssh')

export class RemarkableConnection {
    settings: Settings
    ssh: typeof NodeSSH

    constructor(settings: Settings) {
        this.settings = settings

        this.ssh = new NodeSSH()
    }
}
