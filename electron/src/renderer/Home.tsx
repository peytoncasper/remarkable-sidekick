import * as React from "react";
import RemarkableModel from "_renderer/components/RemarkableModel";
import {useEffect} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {lockscreenImageAtom} from "_renderer/atoms/suspendedImage";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";
import Disconnected from "_renderer/components/Home/disconnected";
import Connected from "_renderer/components/Home/connected";

export function Home() {
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);
    const lockscreenImage = useRecoilValue(lockscreenImageAtom);
    const [storageDetails, setStorageDetails] = useRecoilState(storageDetailsAtom);

    return (
        <div className="w-full flex">
            <div className="flex flex-1 h-screen">
                <RemarkableModel image={lockscreenImage.data}/>
            </div>
            {/*<img src={"public/settings.gif"} alt="gif depicting how to gather connection information from the remarkable device" />*/}
            <div className="flex flex-1 h-screen">

                {connectionStatus.status == "connected" || connectionStatus.status == "syncing" ? <Connected/> : <Disconnected/>}
            </div>
        </div>
    )
}

export default Home
