import * as React from "react";
import {useRecoilState} from "recoil";
import {errorAtom} from "_renderer/atoms/error";
import {useEffect} from "react";
import {SolidIcon} from "_renderer/components/FontAwesome/solid";

export function ErrorPopup() {
    const [error, setError] = useRecoilState(errorAtom);

    function close() {
        setError({
            message: "",
            timeout: 0
        })
    }

    useEffect(() => {
        setTimeout(close, error.timeout != 0 ? error.timeout : 5000)
    })

    return (
        <div
            style={{position: "absolute", left: "40%", bottom: "50px", width: "25%"}}
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded flex flex-row"
            role="alert"
        >
            <div className="flex-1">
                <strong className="font-bold m-auto">{error.message}</strong>
            </div>
            <div onClick={close} className="flex flex-shrink justify-items-end">
                <SolidIcon name="times" fontSize="xx-small" className="text-red-700 m-auto"/>
            </div>

        </div>
    )
}
