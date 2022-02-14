import {RegularIcon} from "_renderer/components/FontAwesome/regular";
import * as React from "react";


interface MetricProps {
    name: string
    icon: string
    metric: number
}

export function Metric(props: MetricProps) {
    return (
        <div className="flex flex-1 items-center">
            <div style={{borderRadius: "100%", width: "36px", height: "36px"}} className="flex bg-white justify-center items-center">
                <RegularIcon className="py-1 px-2 text-teal" name={props.icon}/>
            </div>
            <div className="text-lg px-3">
                {props.metric} {props.name}
            </div>
        </div>
    )
}
