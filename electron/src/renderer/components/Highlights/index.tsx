import * as React from 'react';
import {Highlight} from "_renderer/atoms";
import {useState} from "react";
import {SolidIcon} from "_renderer/components/FontAwesome/solid";
import {mergeClassNames} from "_renderer/components/utils";

interface HighlightsTableProps {
    pages: Highlight[][]
}


export default function HighlightsTable(props: HighlightsTableProps) {
    const [page, setPage] = useState(0);

    function nextPage() {
        console.log("next")
        if (page < props.pages.length - 1) {
            setPage(page + 1)
        }
    }

    function previousPage() {
        console.log("previous")

        if (page > 0) {
            setPage(page - 1)
        }
    }


    return (

        <div className="overflow-x-auto">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200 table-fixed">
                        <thead className="bg-gray-50">
                        <tr>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name
                            </th>
                            <th scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Highlight
                            </th>
                        </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                        {
                           props.pages[page].map((highlight) =>  {
                                return <tr key={highlight.name + highlight.text.substr(0, 12)}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                        {highlight.name}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        {highlight.text}
                                    </td>
                                </tr>


                            })
                        }
                        </tbody>
                    </table>
                    <div
                        className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            <a href="#"
                               className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Previous </a>
                            <a href="#"
                               className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"> Next </a>
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Showing
                                    <span className="font-medium">1</span>
                                    to
                                    <span className="font-medium">10</span>
                                    of
                                    <span className="font-medium">97</span>
                                    results
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                                     aria-label="Pagination">
                                    <a
                                       onClick={previousPage}
                                       className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Previous</span>
                                        <SolidIcon name="chevron-left" fontSize="small"/>
                                    </a>

                                    {
                                        props.pages.map(((value, index) => {

                                            if(props.pages.length > 6) {
                                                if(index < 3) {
                                                    return <a aria-current="page"
                                                              onClick={() => {setPage(index)}}
                                                              className={
                                                                mergeClassNames(
                                                                    "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                                                                    page == index ? "text-teal" : "text-black"
                                                                )
                                                              }
                                                    > {index + 1} </a>
                                                } else if (index > 6) {
                                                    return <a aria-current="page"
                                                              onClick={() => {setPage(index)}}
                                                              className={
                                                                  mergeClassNames(
                                                                      "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                                                                      page == index ? "text-teal" : "text-black"
                                                                  )
                                                              }> {index + 1} </a>
                                                } else if (index == 4) {
                                                    return <a aria-current="page"
                                                              onClick={() => {setPage(index)}}
                                                              className="z-10 text-black relative inline-flex items-center px-4 py-2 border text-sm font-medium"> ... </a>
                                                }
                                            } else {
                                                return <a aria-current="page"
                                                          onClick={() => {setPage(index)}}
                                                          className={
                                                              mergeClassNames(
                                                                  "z-10 relative inline-flex items-center px-4 py-2 border text-sm font-medium",
                                                                  page == index ? "text-teal" : "text-black"
                                                              )
                                                          }> {index + 1} </a>
                                            }


                                        }))
                                    }



                                    {/*<a href="#"*/}
                                    {/*   className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 2 </a>*/}
                                    {/*<a href="#"*/}
                                    {/*   className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 3 </a>*/}
                                    {/*<span*/}
                                    {/*    className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700"> ... </span>*/}
                                    {/*<a href="#"*/}
                                    {/*   className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 hidden md:inline-flex relative items-center px-4 py-2 border text-sm font-medium"> 8 </a>*/}
                                    {/*<a href="#"*/}
                                    {/*   className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 9 </a>*/}
                                    {/*<a href="#"*/}
                                    {/*   className="bg-white border-gray-300 text-gray-500 hover:bg-gray-50 relative inline-flex items-center px-4 py-2 border text-sm font-medium"> 10 </a>*/}
                                    <a
                                       onClick={nextPage}
                                       className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <span className="sr-only">Next</span>
                                        <SolidIcon name="chevron-right" fontSize="small"/>
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

