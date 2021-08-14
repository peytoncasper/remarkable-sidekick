import * as React from "react";
import RemarkableModel from "_renderer/components/RemarkableModel";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {suspendedImageAtom} from "_renderer/atoms/suspendedImage";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";
import Disconnected from "_renderer/components/Home/disconnected";
import Connected from "_renderer/components/Home/connected";


export function Home() {
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);
    const [suspendedImage, setSuspendedImage] = useRecoilState(suspendedImageAtom);
    const [storageDetails, setStorageDetails] = useRecoilState(storageDetailsAtom);





    return (
        <div className="w-full flex">
            <div className="flex flex-1 h-screen">
                <RemarkableModel image={suspendedImage.data}/>
            </div>
            <div className="flex flex-1 h-screen">

                {connectionStatus.status == "connected" ? <Connected/> : <Disconnected/>}
            </div>
        </div>
    )
}

export default Home
