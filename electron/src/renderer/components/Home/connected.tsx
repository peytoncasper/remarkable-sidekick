import * as React from "react";
import {useRecoilState} from "recoil";
import {suspendedImageAtom} from "_renderer/atoms/suspendedImage";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";
import {RegularIcon} from "_renderer/components/FontAwesome/regular";


export function Connected() {
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
        <div className="my-24 mx-10 min-w-0 flex-1 text-2xl text-bold flex-col ">

            <div className="text-bold text-4xl my-12 font-bold">
                Remarkable 2
            </div>


            <div className="flex justify-center my-4">
                <div className="flex flex-1 items-center">
                    <div style={{borderRadius: "100%", width: "36px", height: "36px"}} className="flex bg-white justify-center items-center">
                        <RegularIcon className="text-teal" name={"file-pdf"}/>
                    </div>
                    <div className="text-lg px-3">
                        5 PDFs
                    </div>
                </div>
                <div className="flex flex-1 items-center">
                    <div style={{borderRadius: "100%", width: "36px", height: "36px"}} className="flex bg-white justify-center items-center">
                        <RegularIcon className="py-1 px-2 text-teal" name={"book-open"}/>
                    </div>
                    <div className="text-lg px-3">
                        4 E-Books
                    </div>
                </div>
                <div className="flex flex-1 items-center">
                    <div style={{borderRadius: "100%", width: "36px", height: "36px"}} className="flex bg-white justify-center items-center">
                        <RegularIcon className="py-1 px-2 text-teal" name={"pen-square"}/>
                    </div>
                    <div className="text-lg px-3">
                        10 Notebooks
                    </div>
                </div>
            </div>

            <div className="flex flex-row">
                <div className="w-full">

                    <div className="my-2">
                        Storage
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

                        <div className="overflow-hidden h-3 mb-4 text-xs flex rounded bg-gray-200">
                            {
                                storageDetails.paths.length > 1 ? <div style={{width: ((storageDetails.paths[8].used / (storageDetails.paths[8].available)) * 100) + "%"}}
                                                                       className={
                                                                           mergeClassNames("bg-teal",
                                                                               "shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center")
                                                                       }/> : null
                            }
                        </div>
                    </div>
                    <div className="text-sm text-right">
                        {
                            storageDetails.paths.length > 1 ? (storageDetails.paths[8].used / 1000000).toFixed(2) + " GB / " + (storageDetails.paths[8].available / 1000000).toFixed(2) + " GB Used" : null
                        }
                    </div>
                </div>
            </div>


        </div>
    )
}

export default Connected
