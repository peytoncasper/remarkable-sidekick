import * as React from "react";
import RemarkableModel from "_renderer/components/RemarkableModel";
import {useEffect} from "react";


export function Home() {



    return (
        <div className="w-full flex">
            <div className="m-6 min-w-0 flex-1 flex content-center justify-center">
                <RemarkableModel/>
            </div>
            <div className="m-6 min-w-0 flex-1 text-2xl text-bold">
                Remarkable 2
            </div>
        </div>
    )
}

export default Home
