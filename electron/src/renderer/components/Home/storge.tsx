import {mergeClassNames} from "_renderer/components/utils";
import * as React from "react";
import {StorageDetails} from "_/common/storage";


export function StorageDetails(storageDetails: StorageDetails) {
    return (
        <div>
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
    )
}
