import * as React from "react";
import {SimpleIcon} from "../FontAwesome/simple";
import logo from "../../static/rms-icon-white.png";

function TopNavBar() {
    return (
        <header className="flex-shrink-0 relative h-16 bg-white flex items-center">
            {/* Logo area */}
            <div className="absolute inset-y-0 left-0 md:static md:flex-shrink-0">
                <a
                    href="#"
                    className="flex items-center justify-center h-16 w-16 bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-600 md:w-20"
                >
                    <img
                        className="h-8 w-auto"
                        src={logo}
                        alt="Workflow"
                    />
                </a>
            </div>

            {/* Desktop nav area */}
            <div className="hidden md:min-w-0 md:flex-1 md:flex md:items-center md:justify-between">
                <div className="min-w-0 flex-1">
                    <div className="max-w-2xl relative text-gray-400 focus-within:text-gray-500">
                        <label htmlFor="search" className="sr-only">
                            Search
                        </label>
                        <input
                            id="search"
                            type="search"
                            placeholder="Search"
                            className="block w-full border-transparent pl-12 placeholder-gray-500 focus:border-transparent sm:text-sm focus:ring-0"
                        />
                        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center justify-center pl-4">
                            <SimpleIcon name={"search"} className={"h-5 w-5"} aria-hidden="true"/>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default TopNavBar
