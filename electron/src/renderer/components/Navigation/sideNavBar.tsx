import {mergeClassNames} from "../utils";
import {SolidIcon} from "../FontAwesome/solid";
import {
    Link, useLocation
} from "react-router-dom";
import * as React from "react";
import {useEffect} from "react";
interface SideNavBarProps {
    path: string
}

export const SideNavBar: React.FC<SideNavBarProps> = (props) => {
    const location = useLocation();

    return (
        <nav aria-label="Sidebar" className="hidden md:block md:flex-shrink-0 md:bg-gray-800 md:overflow-y-auto">
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
                        location.pathname == "/" ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
                        'flex-shrink-0 inline-flex items-center justify-center h-14 w-14 rounded-lg'
                    )}
                >
                    <SolidIcon className={"h-6 w-6"} name={"home"} fontSize={"large"}/>
                    <span className="sr-only">"Home</span>
                </Link>

                <Link
                    to="/settings"
                    className={mergeClassNames(
                        location.pathname == "/settings" ? 'bg-gray-900 text-white' : 'text-gray-400 hover:bg-gray-700',
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
