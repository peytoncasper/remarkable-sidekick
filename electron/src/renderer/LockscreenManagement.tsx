import * as React from "react";
import RemarkableModel from "_renderer/components/RemarkableModel";
import {useEffect, useState} from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";
import TopNavBar from "_renderer/components/Navigation/topNavBar";
import {SolidIcon} from "_renderer/components/FontAwesome/solid";
import {localImagesAtom} from "_renderer/atoms/localImagesAtom";
import {FileUpload, UploadLabel} from "_renderer/components/RemarkableModel/styles";
import {FileDropzone} from "_renderer/components/FileDropzone";
import {lockscreenImageAtom} from "_renderer/atoms/suspendedImage";


export function LockscreenManagement() {
    const lockscreenImage = useRecoilValue(lockscreenImageAtom);

    // const [localImages, setLocalImages] = useRecoilState(localImagesAtom);
    // const [galleryView, setGalleryView] = useState("local");
    //
    // const [selectedImage, setSelectedImage] = useState();
    // const [imageSelected, setImageSelected] = useState(false);

    function handleUploadImage() {
        window.api.sendAsynchronousMessage({
            type: "upload_image",
        })
    }



    function changeLockscreen(imageName: string) {
        window.api.sendAsynchronousMessage({
            type: "change_lockscreen",
            name: imageName
        })
    }

    function revertLockscreen() {
        window.api.sendAsynchronousMessage({
            type: "revert_to_default_lockscreen"
        })
    }

    return (
        <div className="w-full flex flex-col">

            <div className="flex flex-1 items-center justify-end m-2">
                <button
                    className="rounded-md text-white bg-green-400 hover:bg-green-500 p-2 font-bold"
                    onClick={(e) => {e.preventDefault(); revertLockscreen()}}
                >Revert to Default Image</button>
            </div>

            {lockscreenImage.data.length > 0 ?
                <div className="h-full flex">

                    <div className="flex flex-1 items-center justify-center">
                        <RemarkableModel image={lockscreenImage.data}/>
                    </div>
                    <div className="flex flex-1 ">
                        <FileDropzone/>
                    </div>
                </div> : <div className="h-full">
                </div>
            }
        </div>

    )
}

export default LockscreenManagement
