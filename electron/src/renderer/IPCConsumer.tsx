import * as React from "react";
import {SetterOrUpdater, useRecoilState, useSetRecoilState} from "recoil";
import {deviceStatsAtom} from "_renderer/atoms/deviceStats";
import {Component, useEffect, useRef} from "react";
import {Settings} from "_/common/settings";
import {settingsAtom} from "_renderer/atoms/settings";
import {ConnectionStatus} from "_/common/remarkableConnection";
import {lockscreenImageAtom} from "_renderer/atoms/suspendedImage";
import {Image, LocalImages} from "_/common/image";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {StorageDetails} from "_/common/storage";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {localImagesAtom} from "_renderer/atoms/localImagesAtom";
import {Error, errorAtom} from "_renderer/atoms/error";
import {Index} from "_/common/file";
import {indexAtom} from "_renderer/atoms";
import {Success, successMessageAtom} from "_renderer/atoms/success";
import {LockscreenImage} from "_/common/lockscreen";
// const { ipcRenderer } = require('electron')

export interface IPCHandler {
    handleDeviceStats: (event: any) => void;
    handleSettings: (event: Settings) => void;
    handleConnectionStatus: (event: ConnectionStatus) => void;
    handleLockscreenImage: (event: LockscreenImage) => void;
    handleStorageDetails: (event: StorageDetails) => void;
    handleLocalImages: (event: LocalImages) => void;
    handleError: (event: Error) => void;
    handleSuccess: (event: Success) => void;
    handleIndex: (event: Index) => void;

}

export class IPCConsumer {
    handler: IPCHandler

    constructor(handler: IPCHandler) {
        this.handler = handler
    }

    connect() {
        window.api.subscribeAsynchronousReply(this.onMessage.bind(this))
        window.api.subscribeAsynchronousMessage(this.onMessage.bind(this))

        console.log("connect")

        window.api.sendAsynchronousMessage({
            type: "init"
        })

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
            case "lockscreen_image":
                this.handler.handleLockscreenImage(arg)
                break;
            case "storage_details":
                this.handler.handleStorageDetails(arg)
                break;
            case "local_images":
                this.handler.handleLocalImages(arg)
                break;
            case "get_index":
                this.handler.handleIndex(arg)
                break;
            case "error":
                this.handler.handleError(arg)
                break;
            case "success":
                this.handler.handleSuccess(arg)
                break;
        }
    }
}

export function IPCListener() {

    const [settings, setSettings] = useRecoilState(settingsAtom);
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);
    const setLockscreenImage = useSetRecoilState(lockscreenImageAtom);
    const [storageDetails, setStorageDetails] = useRecoilState(storageDetailsAtom);
    const [localImages, setLocalImages] = useRecoilState(localImagesAtom);
    const [index, setIndex] = useRecoilState(indexAtom);
    const [error, setError] = useRecoilState(errorAtom);
    const [successMessage, setSuccessMessage] = useRecoilState(successMessageAtom);

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
            handleLockscreenImage: ((event: LockscreenImage) => {
                setLockscreenImage(event)
            }),
            handleStorageDetails: ((event: StorageDetails) => {
                setStorageDetails(event)
            }),
            handleLocalImages: ((event: LocalImages) => {
                setLocalImages(event.images)
            }),
            handleIndex: ((event: Index) => {
                setIndex(event.index)
            }),
            handleError: ((event: Error) => {
                setError(event)
            }),
            handleSuccess: ((event: Success) => {
                setSuccessMessage(event)
            })
        }

        const ipcConsumer = new IPCConsumer(handler);
        ipcConsumer.connect()

        return () => {
            ipcConsumer.disconnect()
        }
    }, [])

    return (<div hidden={true}/>)
}

