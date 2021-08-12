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
        case "home":
            return "fa-home"
        case "search":
            return "fa-search"
        case "exchange":
            return "fa-exchange"
        case "random":
            return "fa-random"
        case "cog":
            return "fa-cog"
        case "image-polaroid":
            return "fa-image-polaroid"
        default:
            return "fa-home"
    }
}

export const SolidIcon : React.FunctionComponent<IconComponentProps> = (props) => {
    let className = mergeClassNames("fas", fontAwesomeLookup(props.name))

    if (props.className) {
        className = mergeClassNames(props.className, className)
    }

    return (
        <Icon className={className} fontSize={props.fontSize}/>
    )
}
