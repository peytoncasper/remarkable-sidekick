import * as React from "react";
import RemarkableModel from "_renderer/components/RemarkableModel";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {suspendedImageAtom} from "_renderer/atoms/suspendedImage";
import {connectionStatusAtom} from "_renderer/atoms/connectionStatus";
import {storageDetailsAtom} from "_renderer/atoms/storageDetails";
import {mergeClassNames} from "_renderer/components/utils";
import TopNavBar from "_renderer/components/Navigation/topNavBar";
import {SolidIcon} from "_renderer/components/FontAwesome/solid";


export function LockscreenManagement() {
    const [connectionStatus, setConnectionStatus] = useRecoilState(connectionStatusAtom);
    const [suspendedImage, setSuspendedImage] = useRecoilState(suspendedImageAtom);
    const [storageDetails, setStorageDetails] = useRecoilState(storageDetailsAtom);

    return (
            <header className="relative h-16 bg-white flex-1 flex items-center">


                {/* Desktop nav area */}
                <div className="md:min-w-0 max-w-sm  flex-1 flex items-center">
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
                                className={'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm border-b border-gray-200'}
                                aria-current='page'
                            >
                                Local
                            </a>
                            <a
                                className={'border-indigo-500 text-indigo-600 w-1/4 py-4 px-1 text-center border-b-2 font-medium text-sm'}
                            >
                                Gallery
                            </a>
                        </nav>
                    </div>
                </div>
            </header>

    )
}

export default LockscreenManagement


{/*<TopNavBar/>*/}
{/*<div className="m-6 min-w-0 flex-1 flex content-center justify-center">*/}
{/*    <RemarkableModel image={suspendedImage.data}/>*/}
{/*</div>*/}
