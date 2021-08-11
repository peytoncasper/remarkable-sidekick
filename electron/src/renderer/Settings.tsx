import {ChangeEvent, useEffect, useLayoutEffect, useState} from "react";
import * as React from "react";
import {useRecoilState} from "recoil";
import {settingsAtom} from "_renderer/atoms/settings";
import {mergeClassNames} from "_renderer/components/utils";
import {RemarkableDevice} from "_/common/settings";
// const { ipcRenderer } = require('electron')

export default function Settings() {
    const [settings, setSettings] = useRecoilState(settingsAtom);

    function handleSaveSettings() {
            // ipcRenderer.send("asynchronous-message", {
            //     type: "save_settings",
            //     host: hostName
            // })


        window.api.sendAsynchronousMessage({
            ...settings,
            type: "save_settings",
        })
    }

    function updateHostname(host: string) {
        setSettings({
            ...settings,
            host: host,
        })
    }

    function updateUsername(username: string) {
        setSettings({
            ...settings,
            username
        })
    }

    function updatePassword(password: string) {
        setSettings({
            ...settings,
            password
        })
    }

    function setDeviceType(deviceType: RemarkableDevice) {
        setSettings({
            ...settings,
            deviceType
        })
    }

    return (
        <form className="w-full p-20">
            <div className={"text-gray-700 font-bold text-4xl mb-8"}>
                Settings
            </div>

            <div className="flex flex-col flex-wrap mb-6 h-4/5">

                <div className="lg:w-1/2 w-1/2 mb-8">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="hostName">
                        Device Type
                    </label>
                    <span className="relative z-0 inline-flex shadow-sm rounded-md">
                      <button
                          type="button"
                          className={mergeClassNames(settings.deviceType !== "RM" ? "bg-white" : "bg-gray-200",
                              "relative inline-flex items-center px-4 py-2  border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 rounded-tl-lg rounded-bl-lg")}
                          onClick={() => {setDeviceType("RM")}}

                      >
                        Remarkable
                      </button>
                      <button
                          type="button"
                          className={mergeClassNames(settings.deviceType !== "RM2" ? "bg-white" : "bg-gray-200",
                          "-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 font-medium text-gray-700 hover:bg-gray-50 rounded-tr-lg rounded-br-lg")}
                          onClick={() => {setDeviceType("RM2")}}
                      >
                        Remarkable 2
                      </button>
                    </span>
                </div>

                <div className="lg:w-1/2 w-1/2 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="hostName">
                        Host Name
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="hostName" type="text" placeholder="remarkable" value={settings.host} onChange={(e) => {updateHostname(e.target.value)}}/>
                </div>

                <div className="lg:w-1/2 w-1/2 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="username">
                        Username
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="username" type="text" placeholder="root" value={settings.username} onChange={(e) => {updateUsername(e.target.value)}}/>
                </div>

                <div className="lg:w-1/2 w-1/2 mb-6">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                           htmlFor="password">
                        Password
                    </label>
                    <input
                        className="appearance-none block w-full bg-gray-200 text-gray-700 rounded py-3 px-4 mb-3 leading-tight focus:outline-none"
                        id="password" type="text" placeholder="" value={settings.password} onChange={(e) => {updatePassword(e.target.value)}}/>
                </div>

            </div>

            <div className="flex lg:w-1/2 w-1/2 justify-end">
                <button
                    id={"saveSettings"}
                    className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    onClick={(e) => {e.preventDefault(); handleSaveSettings()}}
                >
                    Save
                </button>
            </div>


        </form>
    )
}

