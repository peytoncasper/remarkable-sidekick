import * as React from "react";
import {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'
import {SolidIcon} from "_renderer/components/FontAwesome/solid";

export function FileDropzone() {
    const onDrop = useCallback((acceptedFiles: any) => {
        // Do something with the files
    }, [])
    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return (
        <div className="flex flex-1 p-20">
            <div className="w-full h-full flex items-center justify-center border-dashed border-4 border-gray-200 bg-gray-100 rounded-3xl" {...getRootProps()}>
                <input {...getInputProps()} />
                {
                    isDragActive ?
                        <p>Drop the files here ...</p> :
                        <div className="flex items-center justify-center flex-col">
                            <SolidIcon fontSize="2x-large" name="file-image" className="text-gray-500"/>
                            <div className="text-bold">Drag & drop a file to upload</div>
                        </div>
                }
            </div>
        </div>

    )
}
