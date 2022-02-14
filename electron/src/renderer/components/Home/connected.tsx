import * as React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";
import {RegularIcon} from "_renderer/components/FontAwesome/regular";
import {indexAtom, metricsSelector} from "_renderer/atoms";
import {Metric} from "_renderer/components/Home/metric";
import {StorageSuspenseContainer, SuspenseContainer} from "./style";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {StorageDetails} from "_renderer/components/Home/storge";


export function Connected() {
    const [storageDetails, setStorageDetails] = useRecoilState(storageDetailsAtom);
    const connectionStatus = useRecoilValue(connectionStatusAtom);

    const metrics = useRecoilValue(metricsSelector);

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
                {connectionStatus.status == "connected" ? <Metric name="PDFs" icon="file-pdf" metric={metrics.pdfs}/> : <SuspenseContainer/>}
                {connectionStatus.status == "connected" ?<Metric name="E-Books" icon="book-open" metric={metrics.ebooks}/> : <SuspenseContainer/>}
                {connectionStatus.status == "connected" ? <Metric name="Notebooks" icon="pen-square" metric={metrics.notebooks}/> : <SuspenseContainer/>}
            </div>

            <div className="flex flex-row">
                <div className="w-full">

                    <div className="my-2">
                        Storage
                    </div>

                    {
                        connectionStatus.status == "connected" ?
                            <StorageDetails
                                used={storageDetails.used}
                                available={storageDetails.available}
                                paths={storageDetails.paths}/> : <StorageSuspenseContainer/>
                    }

                </div>
            </div>


        </div>
    )
}

export default Connected
