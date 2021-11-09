import {mergeClassNames} from "../utils";
import {SolidIcon} from "../FontAwesome/solid";
import {
    Link, useLocation
} from "react-router-dom";
import * as React from "react";
import {useEffect} from "react";
import logo from "_renderer/static/logo-icon-dark.png";
import styled from "styled-components";

interface SideNavBarProps {
    path: string
}

export const SideNavBar: React.FC<SideNavBarProps> = (props) => {
    const location = useLocation();

    return (
        <nav aria-label="Sidebar" style={{background: "#FFFFFF"}} className="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto">
            <div className="absolute inset-y-0 left-0 flex-shrink-1 md:static md:flex-shrink-0">
                <a
                    href="#"
                    className="flex items-center justify-center h-16 w-16 md:w-20"
                    style={{background: "#FFFFFF", cursor: "auto"}}
                >
                    <img
                        className="h-8 w-auto"
                        src={logo}
                        alt="Remarkable Sidekick Logo"
                    />
                </a>
            </div>
            <div className="relative w-20 flex flex-col p-3 space-y-3">

                {/*{sidebarNavigation.map((item) => (*/}
                {/*    <a*/}
                {/*        key={item.name}*/}
                {/*        href={item.href}*/}
                {/*        className={mergeClassNames(*/}
                {/*            item.current ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',*/}
                {/*            'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'*/}
                {/*        )}*/}
                {/*    >*/}
                {/*        <Link to="/home">Users</Link>*/}
                {/*        <SimpleIcon key={item.name} className={"h-6 w-6"} name={item.name} fontSize={"large"}/>*/}
                {/*        <span className="sr-only">{item.name}</span>*/}
                {/*    </a>*/}

                <Link
                    to="/"
                    className={mergeClassNames(
                        location.pathname == "/" ? 'text-teal' : 'text-icon-gray',
                        'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
                    )}
                >
                    <SolidIcon className={"h-6 w-6"} name={"home"} fontSize={"large"}/>
                    <span className="sr-only">"Home</span>
                </Link>

                <Link
                    to="/lockscreen"
                    className={mergeClassNames(
                        location.pathname == "/lockscreen" ? 'text-teal' : 'text-icon-gray',
                        'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
                    )}
                >
                    <SolidIcon className={"h-6 w-6"} name={"image-polaroid"} fontSize={"large"}/>
                    <span className="sr-only">"Lockscreens</span>
                </Link>

                <Link
                    to="/highlights"
                    className={mergeClassNames(
                        location.pathname == "/highlights" ? 'text-teal' : 'text-icon-gray',
                        'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
                    )}
                >
                    <SolidIcon className={"h-6 w-6"} name={"highlighter"} fontSize={"large"}/>
                    <span className="sr-only">"Highlights</span>
                </Link>


                <Link
                    to="/settings"
                    className={mergeClassNames(
                        location.pathname == "/settings" ? 'text-teal' : 'text-icon-gray',
                        'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
                    )}
                >
                    <SolidIcon className={"h-6 w-6"} name={"cog"} fontSize={"large"}/>
                    <span className="sr-only">"Settings</span>
                </Link>


                {/*<a*/}
                {/*    className={mergeClassNames(*/}
                {/*        true ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',*/}
                {/*        'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'*/}
                {/*    )}*/}
                {/*>*/}

                {/*</a>*/}


            </div>
        </nav>
    )
}

export default SideNavBar
