import * as React from "react";
import {SetterOrUpdater, useRecoilState} from "recoil";
import {deviceStatsAtom} from "_renderer/atoms/deviceStats";
import {Component, useEffect, useRef} from "react";
import {Settings} from "_/common/settings";
import {settingsAtom} from "_renderer/atoms/settings";
import {ConnectionStatus} from "_/common/remarkableConnection";
import {suspendedImageAtom} from "_renderer/atoms/suspendedImage";
import {Image, LocalImages} from "_/common/image";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {StorageDetails} from "_/common/storage";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {localImagesAtom} from "_renderer/atoms/localImagesAtom";
import {Error, errorAtom} from "_renderer/atoms/error";
// const { ipcRenderer } = require('electron')

export interface IPCHandler {
    handleDeviceStats: (event: any) => void;
    handleSettings: (event: Settings) => void;
    handleConnectionStatus: (event: ConnectionStatus) => void;
    handleSuspendedImage: (event: Image) => void;
    handleStorageDetails: (event: StorageDetails) => void;
    handleLocalImages: (event: LocalImages) => void;
    handleError: (event: Error) => void;

}

export class IPCConsumer {
    handler: IPCHandler

    constructor(handler: IPCHandler) {
        this.handler = handler


    }

    connect() {
        window.api.subscribeAsynchronousReply(this.onMessage.bind(this))
        window.api.subscribeAsynchronousMessage(this.onMessage.bind(this))

        // ipcRenderer.on('asynchronous-reply', this.onMessage.bind(this))
    }

    disconnect() {
        window.api.disconnect()
    }

    onMessage(event: { reply: (arg0: string, arg1: string) => void; }, arg: any) {
        switch(arg.type) {
            case "settings":
                this.handler.handleSettings(arg)
                break
            case "connection_status":
                this.handler.handleConnectionStatus(arg)
                break
            case "suspended_image":
                this.handler.handleSuspendedImage(arg)
                break;
            case "storage_details":
                this.handler.handleStorageDetails(arg)
                break;
            case "local_images":
                this.handler.handleLocalImages(arg)
                break;
            case "error":
                this.handler.handleError(arg)
        }
    }
}

export function IPCListener() {

    const [settings, setSettings] = useRecoilState(settingsAtom);
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);
    const [suspendedImage, setSuspendedImage] = useRecoilState(suspendedImageAtom);
    const [storageDetails, setStorageDetails] = useRecoilState(storageDetailsAtom);
    const [localImages, setLocalImages] = useRecoilState(localImagesAtom);
    const [error, setError] = useRecoilState(errorAtom);

    useEffect(() => {

        const handler: IPCHandler = {
            handleDeviceStats: ((event: any) => {

            }),
            handleSettings: ((event: Settings) => {
                setSettings(event)
            }),
            handleConnectionStatus: ((event: ConnectionStatus) => {
                setConnectionStatus(event)
            }),
            handleSuspendedImage: ((event: Image) => {
                setSuspendedImage(event)
            }),
            handleStorageDetails: ((event: StorageDetails) => {
                setStorageDetails(event)
            }),
            handleLocalImages: ((event: LocalImages) => {
                setLocalImages(event.images)
            }),
            handleError: ((event: Error) => {
                setError(event)
            })
        }

        const ipcConsumer = new IPCConsumer(handler);
        ipcConsumer.connect()

        return () => {
            ipcConsumer.disconnect()
        }
    })

    return (<div hidden={true}/>)
}

