import * as React from "react";
import RemarkableModel from "_renderer/components/RemarkableModel";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {suspendedImageAtom} from "_renderer/atoms/suspendedImage";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";


export function Home() {
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);
    const [suspendedImage, setSuspendedImage] = useRecoilState(suspendedImageAtom);
    const [storageDetails, setStorageDetails] = useRecoilState(storageDetailsAtom);

    const colors = [
        "bg-blue-300",
        "bg-blue-400",
        "bg-blue-500",
        "bg-blue-600",
        "bg-blue-700",
        "bg-green-500",
        "bg-green-400",
        "bg-green-300",
        "bg-green-200"

    ]

    function handleConnectClick() {
        window.api.sendSynchronousMessage({
            type: "connect"
        })

    }

    return (
        <div className="w-full flex">
            <div className="m-6 min-w-0 flex-1 flex content-center justify-center">
                <RemarkableModel image={suspendedImage.data}/>
            </div>
            <div className="m-6 min-w-0 flex-1 text-2xl text-bold flex-col">
                Remarkable 2


                <div className="text-bold">
                    {
                        storageDetails.paths.length > 1 ? (storageDetails.paths[8].used / 1000000).toFixed(2) + " / " + (storageDetails.paths[8].available / 1000000).toFixed(2) + " GB" : null
                    }
                </div>
                <div className="relative pt-1">
                    {/*<div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">*/}
                    {/*    {*/}
                    {/*        storageDetails.paths.map((path, i) => {*/}
                    {/*            return <div style={{width: ((path.used / storageDetails.available) * 100) + "%"}}*/}
                    {/*                 className={*/}
                    {/*                     mergeClassNames(colors[i % colors.length],*/}
                    {/*                         "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center")*/}
                    {/*                 }/>*/}
                    {/*        })*/}
                    {/*    }*/}
                    {/*</div>*/}

                    <div className="overflow-hidden h-4 mb-4 text-xs flex rounded bg-gray-200">
                        {
                            storageDetails.paths.length > 1 ? <div style={{width: ((storageDetails.paths[8].used / (storageDetails.paths[8].available)) * 100) + "%"}}
                                        className={
                                            mergeClassNames(colors[0],
                                                "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center")
                                        }/> : null
                        }
                    </div>
                    <button
                        id={"saveSettings"}
                        className="shadow focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded"
                        onClick={(e) => {e.preventDefault(); handleConnectClick()}}
                        style={{background: "#08DAAD"}}
                    >
                        Connect
                    </button>
                </div>
            </div>
            <div>
                {connectionStatus.status}
            </div>
        </div>
    )
}

export default Home
