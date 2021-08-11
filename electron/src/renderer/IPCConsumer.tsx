import * as React from "react";
import {SetterOrUpdater, useRecoilState} from "recoil";
import {deviceStatsAtom} from "_renderer/atoms/deviceStats";
import {Component, useEffect, useRef} from "react";
import {Settings} from "_/common/settings";
import {settingsAtom} from "_renderer/atoms/settings";
// const { ipcRenderer } = require('electron')

export interface IPCHandler {
    handleDeviceStats: (event: any) => void;
    handleSettings: (event: Settings) => void;

}

export class IPCConsumer {
    handler: IPCHandler

    constructor(handler: IPCHandler) {
        this.handler = handler

        window.api.subscribeAsynchronousReply(this.onMessage.bind(this))
    }

    connect() {
        // ipcRenderer.on('asynchronous-reply', this.onMessage.bind(this))
    }

    onMessage(event: { reply: (arg0: string, arg1: string) => void; }, arg: any) {
        switch(arg.type) {
            case "settings":
                this.handler.handleSettings(arg)
        }
    }
}

export function IPCListener() {
    let isMounted = false;

    const [settings, setSettings] = useRecoilState(settingsAtom);


    useEffect(() => {
        isMounted = true

        const handler: IPCHandler = {
            handleDeviceStats: ((event: any) => {

            }),

            handleSettings: ((event: Settings) => {
                setSettings(event)
            }),
        }

        const ipcConsumer = new IPCConsumer(handler);

        return () => {
            isMounted = false
        }
    })

    return (<div hidden={true}/>)
}
