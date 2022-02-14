import * as React from "react";
import {useRecoilState, useRecoilValue} from "recoil";
import {highlightSelector} from "_renderer/atoms";
import {useState} from "react";
import {FileObject} from "_/common/file";
import HighlightsTable from "_renderer/components/Highlights";
import {SyncScreen} from "_renderer/components/SyncScreen";


export function Highlights() {
    const highlightPages = useRecoilValue(highlightSelector)

    return (
        <div className="w-full max-w-full flex flex-col">
            <h2 className="text-2xl font-bold text-gray-900 mx-8 my-4">
                Highlights
            </h2>
            { highlightPages != undefined && highlightPages.length > 0 ? <HighlightsTable pages={highlightPages}/> : <SyncScreen/>}
        </div>
    )
}

export default Highlights

