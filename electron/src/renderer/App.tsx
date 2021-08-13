import * as React from "react";
import TopNavBar from "./components/Navigation/topNavBar";
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
import logo from "_renderer/static/rms-icon-white.png";


function App() {
    const [settings, setSettings] = useRecoilState(settingsAtom);

    useEffect(() => {
        // if(!settings) {

        window.api.sendAsynchronousMessage({
            type: "get_settings"
        })

        window.api.sendAsynchronousMessage({
            type: "get_local_images"
        })
        // }
    }, [])

    return (
        <HashRouter >
            <IPCListener/>
            <div className={"h-screen flex flex-col"}>
                <div className="h-screen overflow-hidden flex flex-col">

                    <div className="min-h-0 flex-1 flex overflow-hidden">
                        <SideNavBar path={"/"}/>
                        <main className="min-w-0 flex-1 lg:flex">
                            <Switch>
                                <Route path="/lockscreen" component={LockscreenManagement}/>
                                <Route path="/settings" component={Settings}/>
                                <Route path="/" component={Home}/>
                            </Switch>

                            {/*/!* Primary column *!/*/}
                            {/*<section*/}
                            {/*    aria-labelledby="primary-heading"*/}
                            {/*    className="min-w-0 flex-1 h-full flex flex-col overflow-hidden lg:order-last"*/}
                            {/*>*/}
                            {/*    <h1 id="primary-heading" className="sr-only">*/}
                            {/*        Home*/}
                            {/*    </h1>*/}
                            {/*    /!* Your content *!/*/}
                            {/*</section>*/}

                            {/*/!* Secondary column (hidden on smaller screens) *!/*/}
                            {/*<aside className="hidden lg:block lg:flex-shrink-0 lg:order-first">*/}
                            {/*    <div className="h-full relative flex flex-col w-96 border-r border-gray-200 bg-gray-100">*/}
                            {/*        /!* Your content *!/*/}
                            {/*    </div>*/}
                            {/*</aside>*/}
                        </main>
                    </div>
                </div>
            </div>
        </HashRouter>
  )
}

export default App;
