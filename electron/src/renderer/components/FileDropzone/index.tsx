import * as React from "react";
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {SolidIcon} from "_renderer/components/FontAwesome/solid";

export function FileDropzone() {
    function saveImage(event: any) {
        const file = event.target.files[0]

        // Adding comment for later when JPEG support comes along
        // jpe?g|png


    }

    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
        const file = acceptedFiles[0]

        if ( /\.(png)$/i.test(file.name) ) {
            const reader = new FileReader();

            reader.addEventListener("load", function () {
                const img = {
                    type: "change_lockscreen",
                    name: file.name,
                    data: (reader.result as string).replace(/data:.*;base64,/, "")
                }

                window.api.sendAsynchronousMessage(img)
            }, false);

            reader.readAsDataURL(file);
        }
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="flex flex-1 py-40 px-24">
            <div className="w-full h-full flex items-center justify-center border-dashed border-2 border-gray-300 bg-gray-100 rounded-xl" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <div className="flex items-center justify-center flex-col">
                            <SolidIcon fontSize="2x-large" name="file-image" className="text-gray-500"/>
                            <div className="text-gray-600 m-4">Drag & drop or click to upload a PNG or JPEG image</div>
                        </div>
                }
            </div>
        </div>

    )
}
