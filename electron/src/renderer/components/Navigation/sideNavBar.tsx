import {mergeClassNames} from "../utils";
import {SimpleIcon} from "../FontAwesome/simple";
import {RemarkableModel} from "../RemarkableModel";
import * as React from "react";
const sidebarNavigation = [
    { name: 'home', href: '#', current: true },
]

function SideNavBar() {
    return (
        <div className="h-screen overflow-hidden bg-gray-100 flex flex-col">
            <div className="min-h-0 flex-1 flex overflow-hidden">
                <nav aria-label="Sidebar" className="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto">
                    <div className="relative w-20 flex flex-col p-3 space-y-3">
                        {sidebarNavigation.map((item) => (
                            <a
                                key={item.name}
                                href={item.href}
                                className={mergeClassNames(
                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
                                    'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
                                )}
                            >
                                <SimpleIcon key={item.name} className={"h-6 w-6"} name={item.name} fontSize={"large"}/>
                                <span className="sr-only">{item.name}</span>
                            </a>
                        ))}
                    </div>
                </nav>
                <main className="m-6 min-w-0 flex-1 border-t border-gray-200 lg:flex">
                    <RemarkableModel/>

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
    )
}

export default SideNavBar
