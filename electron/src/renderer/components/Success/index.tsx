import * as React from "react";
import {useRecoilState} from "recoil";
import {errorAtom} from "_renderer/atoms/error";
import {useEffect} from "react";
import {SolidIcon} from "_renderer/components/FontAwesome/solid";
import {successMessageAtom} from "_renderer/atoms/success";

export function SuccessPopup() {
    const [successMessage, setSuccessMessage] = useRecoilState(successMessageAtom);

    function close() {
        setSuccessMessage({
            message: "",
            timeout: 0
        })
    }

    useEffect(() => {
        setTimeout(close, successMessage.timeout != 0 ? successMessage.timeout : 5000)
    })

    return (
        <div
            style={{position: "absolute", left: "40%", bottom: "50px", width: "25%"}}
            className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex flex-row"
            role="alert"
        >
            <div className="flex-1">
                <strong className="font-bold m-auto">{successMessage.message}</strong>
            </div>
            <div onClick={close} className="flex flex-shrink justify-items-end">
                <SolidIcon name="times" fontSize="xx-small" className="text-green-700 m-auto"/>
            </div>

        </div>
    )
}
