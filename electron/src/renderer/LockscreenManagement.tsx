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

    return (
        <div className="w-full">
            <header className="relative h-16 bg-white flex-1 flex items-center justify-between">


                {/* Desktop nav area */}
                <div className="md:min-w-0   flex-1 flex items-center">
                    <div className="relative text-gray-400 focus-within:text-gray-500">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <input
                            id="search"
                            type="search"
                            placeholder="Search"
                            className="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                            <SolidIcon name={"search"} className={"h-5 w-5"} aria-hidden="true"/>
                        </div>
                    </div>

                </div>
                <div className="flex-1">
                    <div className="">
                        <nav className="-mb-px flex" aria-label="Tabs">
                            <a
                                style={{cursor: "pointer"}}
                                className={mergeClassNames(
                                    galleryView == "local" ? "border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm')
                                }
                                aria-current='page'
                                onClick={() => {setGalleryView("local")}}
                            >
                                Local
                            </a>
                            <a
                                style={{cursor: "pointer"}}
                                className={mergeClassNames(
                                    galleryView == "gallery" ? "border-indigo-500 text-indigo-600" : "text-gray-500 hover:text-gray-700 hover:border-gray-300",
                                    'w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm')
                                    }
                                onClick={() => {setGalleryView("gallery")}}
                            >
                                Gallery
                            </a>
                        </nav>
                    </div>
                </div>
                <div className="mx-10 w-72">
                    <button
                        id={"saveSettings"}
                        className="shadow focus:shadow-outline focus:outline-none text-white font-bold py-1 px-2 rounded"
                        style={{background: "#08DAAD"}}
                        onClick={handleUploadImage}
                    >
                        Upload
                    </button>

                    <UploadLabel
                        htmlFor="file-upload"
                        className="rounded py-2 px-4 text-white font-bold centered"
                    >
                        <SolidIcon name="file-upload" className="mx-2"/>
                        Add Image
                    </UploadLabel>
                    <FileUpload type="file" id="file-upload" onChange={saveImage}/>
                </div>
            </header>
            <div className="p-10 flex ">
                <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8 h-full w-full">
                    {localImages.map((image) => (
                        <li key={image.name} className="relative">
                            <div className="h-72 w-52 group block w-full aspect-w-10 aspect-h-7 rounded-lg bg-gray-100 focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500 overflow-hidden">
                                <img src={"data:image/png;base64," + image.data} alt="" className="object-cover pointer-events-none group-hover:opacity-75 h-72 w-52" />
                                <button type="button" className="absolute inset-0 focus:outline-none">
                                    <span className="sr-only">View details for {image.name}</span>
                                </button>
                            </div>
                            <p className="mt-2 block text-sm font-medium text-gray-900 truncate pointer-events-none">{image.name}</p>
                            {/*<p className="block text-sm font-medium text-gray-500 pointer-events-none">{file.size}</p>*/}
                        </li>
                    ))}
                </ul>
            </div>
        </div>

    )
}

export default LockscreenManagement


{/*<TopNavBar/>*/}
{/*<div className="m-6 min-w-0 flex-1 flex content-center justify-center">*/}
{/*    <RemarkableModel image={suspendedImage.data}/>*/}
{/*</div>*/}
