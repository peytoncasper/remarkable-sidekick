import * as React from "react";
import SideNavBar from "./components/Navigation/sideNavBar";
import {Route, Switch} from "react-router";
import {HashRouter} from "react-router-dom";
import Settings from "_renderer/Settings";
import Home from "_renderer/Home";
import {IPCListener} from "_renderer/IPCConsumer";
import {useEffect} from "react";
import {useRecoilState} from "recoil";
import {settingsAtom} from "_renderer/atoms/settings";
import LockscreenManagement from "_renderer/LockscreenManagement";
import {ErrorPopup} from "_renderer/components/Error";
import {errorAtom} from "_renderer/atoms/error";
import Highlights from "_renderer/Highlights";
import {successMessageAtom} from "_renderer/atoms/success";
import {SuccessPopup} from "_renderer/components/Success";


function App() {
    const [settings, setSettings] = useRecoilState(settingsAtom);
    const [error, setError] = useRecoilState(errorAtom);
    const [successMessage, setSuccessMessage] = useRecoilState(successMessageAtom);

    useEffect(() => {
        // window.api.sendAsynchronousMessage({
        //     type: "get_settings"
        // })
        //
        // window.api.sendAsynchronousMessage({
        //     type: "get_local_images"
        // })
        //
        // window.api.sendAsynchronousMessage({
        //     type: "get_index"
        // })
    }, [])

    return (
        <HashRouter >
            <IPCListener/>
            <div className={"h-screen flex flex-col"}>
                <div className="h-full flex flex-col">

                    <div className="min-h-0 flex-1 flex overflow-hidden">
                        <SideNavBar path={"/"}/>
                        <main className="min-w-0 flex-1 lg:flex">
                            <Switch>
                                <Route path="/lockscreen" component={LockscreenManagement}/>
                                <Route path="/settings" component={Settings}/>
                                <Route path="/highlights" component={Highlights}/>
                                <Route path="/" component={Home}/>
                            </Switch>

                            {
                                error.message != "" ? <ErrorPopup/> : null
                            }
                            {
                                successMessage.message != "" ? <SuccessPopup/> : null
                            }
                        </main>
                    </div>
                </div>
            </div>
        </HashRouter>
  )
}

export default App;
