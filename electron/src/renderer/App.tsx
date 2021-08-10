import * as React from "react";
import TopNavBar from "./components/Navigation/topNavBar";
import SideNavBar from "./components/Navigation/sideNavBar";
import {Route, Switch} from "react-router";
import {RemarkableModel} from "_renderer/components/RemarkableModel";
import {HashRouter} from "react-router-dom";
import Settings from "_renderer/Settings";

function App() {

    return (
        <HashRouter >
            <div className={"h-screen flex flex-col"}>
                <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">
                    <TopNavBar/>
                    <div className="min-h-0 flex-1 flex overflow-hidden">
                        <SideNavBar path={"/"}/>
                        <main className="m-6 min-w-0 flex-1 border-t border-gray-200 lg:flex">
                            <Switch>
                                <Route path="/settings" component={Settings}/>
                                <Route path="/" component={RemarkableModel}/>
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
