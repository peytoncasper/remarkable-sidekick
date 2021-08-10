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
        default:
            return "fa-home"
    }
}

export const SimpleIcon : React.FunctionComponent<IconComponentProps> = (props) => {
    let className = mergeClassNames("fas", fontAwesomeLookup(props.name))

    if (props.className) {
        className = mergeClassNames(props.className, className)
    }

    return (
        <Icon className={className} fontSize={props.fontSize}/>
    )
}
