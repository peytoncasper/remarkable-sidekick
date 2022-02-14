import * as React from 'react';
import {SolidIcon} from "_renderer/components/FontAwesome/solid";

export function SyncScreen() {
    return (
        <div className="w-full max-w-full h-full flex flex-col items-center justify-center">
            Syncing
            <SolidIcon className={"h-6 w-6"} name="sync" fontSize={"large"}/>
        </div>
    )
}
