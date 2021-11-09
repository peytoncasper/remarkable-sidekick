import * as React from "react";
import RemarkableModel from "_renderer/components/RemarkableModel";
import {useEffect, useState} from "react";
import {useRecoilState} from "recoil";
import {suspendedImageAtom} from "_renderer/atoms/suspendedImage";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";
import TopNavBar from "_renderer/components/Navigation/topNavBar";
import {SolidIcon} from "_renderer/components/FontAwesome/solid";
import {localImagesAtom} from "_renderer/atoms/localImagesAtom";
import {FileUpload, UploadLabel} from "_renderer/components/RemarkableModel/styles";
import {FileDropzone} from "_renderer/components/FileDropzone";


export function LockscreenManagement() {
    const [localImages, setLocalImages] = useRecoilState(localImagesAtom);
    const [galleryView, setGalleryView] = useState("local");

    const [selectedImage, setSelectedImage] = useState();
    const [imageSelected, setImageSelected] = useState(false);

    function handleUploadImage() {
        window.api.sendAsynchronousMessage({
            type: "upload_image",
        })
    }

    function saveImage(event: any) {
        const file = event.target.files[0]

        // Adding comment for later when JPEG support comes along
        // jpe?g|png

        if ( /\.(png)$/i.test(file.name) ) {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                const img = {
                    type: "save_image",
                    name: file.name,
                    data: (reader.result as string).replace(/data:.*;base64,/, "")
                }

                window.api.sendAsynchronousMessage(img)
            }, false);

            reader.readAsDataURL(file);
        }
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
            {localImages.length > 0 ?
                <div className="h-full flex">
                    <div className="flex flex-1 items-center justify-center">
                        <RemarkableModel image={localImages[0].data}/>
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
