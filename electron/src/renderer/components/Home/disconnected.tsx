import * as React from "react";
import RemarkableModel from "_renderer/components/RemarkableModel";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";
import {SolidIcon} from "_renderer/components/FontAwesome/solid";
import {BrandedIcon} from "_renderer/components/FontAwesome/branded";
import {HelpContainer} from "_renderer/components/Home/style";

export function Disconnected() {
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);

    function connectionSwitch(status: string) {
        switch(status) {
            case "connecting":
                return "Connecting"
            case "disconnected":
                return "Connect"
        }
    }

    function handleConnectClick() {
        window.api.sendAsynchronousMessage({
            type: "connect"
        })
    }

    return (
        <div className="m-auto">
            <div className="text-2xl font-bold">
                No Remarkable Device Found
            </div>
            <div className="flex justify-center my-5">
                Need Help Connecting?
            </div>

            <div className="flex justify-center my-10">
                <div className="flex flex-1 justify-center ">
                    <HelpContainer className="flex flex-row">
                        <BrandedIcon className="py-1 px-2" name={"usb"}/>
                        <div className="text-lg">
                            USB
                        </div>
                    </HelpContainer>
                </div>
                <div className="flex flex-1 justify-center">
                    <HelpContainer className="flex flex-row">
                        <SolidIcon className="py-1 px-2" name={"wifi"}/>
                        <div className="text-lg">
                            Wi-Fi
                        </div>
                    </HelpContainer>
                </div>
            </div>

            <button
                className="flex flex-1 rounded-md bg-green-400 hover:bg-green-500 p-2 font-bold w-48 m-auto"
                onClick={(e) => {e.preventDefault(); handleConnectClick()}}
            >
                {
                    connectionStatus.status == "connecting" ? <div className="m-auto">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg"
                             fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor"/>
                            <path className="opacity-75" fill="currentColor"
                                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
                        </svg>
                    </div> : null
                }
                <div className="text-white w-full text-center">
                    {connectionSwitch(connectionStatus.status)}
                </div>
            </button>

        </div>
    )
}

export default Disconnected
