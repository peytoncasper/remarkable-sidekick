import {FileUpload, Overlay, OverlayButtonContainer, UploadLabel} from "./styles";
import * as React from "react";
import {SimpleIcon} from "../FontAwesome/simple";
import background from "../../static/background.png";
import {useEffect, useRef} from "react";

interface IconComponentProps {
    name: string
    className?: string
    fontSize?: string
}

function handleMouseEnter(e: MouseEvent) {

}

// function onFileUpload = () => {
//
//     // Create an object of formData
//     const formData = new FormData();
//
//     // Update the formData object
//     formData.append(
//         "myFile",
//         this.state.selectedFile,
//         this.state.selectedFile.name
//     );
//
//     // Details of the uploaded file
//     console.log(this.state.selectedFile);
//
//     // Request made to the backend api
//     // Send formData object
//     axios.post("api/uploadfile", formData);
// };


export function RemarkableModel() {
    const isMountedRef = useRef(false);
    const [mouseOver, setMouseOver] = React.useState(false);

    function handleMouseOver(event: MouseEvent) {
        if (isMountedRef.current) {
            setMouseOver(true)
        }
    }

    function handleMouseLeave(event: MouseEvent) {
        if (isMountedRef.current) {
            setMouseOver(false)
        }
    }

    useEffect(() => {
        isMountedRef.current = true;
        const overlayContainer = document.getElementById("overlayContainer") as HTMLDivElement
        overlayContainer.addEventListener("mouseover", handleMouseOver);
        overlayContainer.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            isMountedRef.current = false;
            overlayContainer.removeEventListener("mouseover", handleMouseOver);
            overlayContainer.removeEventListener("mouseleave", handleMouseLeave);
        }

    }, [])

    return (
        <div style={{maxHeight:"700px"}} className={"container max-w-lg h-5/6 bg-gray-200 rounded-lg flex flex-row"}>
            <div className={"w-10 h-full bg-gray-300 rounded-bl-lg rounded-tl-lg"}/>
            <div id="overlayContainer" className={"w-full border-gray-300 border-2 m-8 mb-20"} style={{position: "relative"}}>
                <Overlay className={ mouseOver ? "bg-gray-300 bg-opacity-50" : ""}/>
                <img className={"w-full h-full max-w-full max-h-full"} src={background} />
                {mouseOver ?
                    <OverlayButtonContainer>
                        <UploadLabel htmlFor="file-upload" className="custom-file-upload bg-gray-300 hover:bg-gray-400 rounded-lg centered">
                            Change Lockscreen
                        </UploadLabel>
                        <FileUpload type="file" id="file-upload"/>
                    </OverlayButtonContainer> : null
                }
            </div>
        </div>
    )
}

export default RemarkableModel
