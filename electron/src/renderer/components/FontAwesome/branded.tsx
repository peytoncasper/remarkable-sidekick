import {Icon} from "./styles";
import * as React from "react";
import {mergeClassNames} from "../utils";

interface IconComponentProps {
    name: string
    className?: string
    fontSize?: string
}

function fontAwesomeLookup(name: string): string {
    switch(name) {
        case "usb":
            return "fa-usb"
        default:
            return ""
    }
}

export const BrandedIcon : React.FunctionComponent<IconComponentProps> = (props) => {
    let className = mergeClassNames("fab", fontAwesomeLookup(props.name))

    if (props.className) {
        className = mergeClassNames(props.className, className)
    }

    return (
        <Icon className={className} fontSize={props.fontSize}/>
    )
}
