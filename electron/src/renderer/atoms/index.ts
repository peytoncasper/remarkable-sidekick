import {atom, selector} from "recoil";
import {FileObject} from "_/common/file";

export interface Highlight {
    name: string
    text: string
}

export const indexAtom = atom<Map<string, FileObject>>({
    key: 'index',
    default: new Map<string, FileObject>(),
});

export const metricsSelector = selector({
    key: 'metricSelector',
    get: ({get}) => {
        const index = get(indexAtom);

        let metrics = {
            pdfs: 0,
            ebooks: 0,
            notebooks: 0
        }

        for (let [key, value] of index) {
            if (value.type == "pdf") {
                metrics.pdfs += 1
            } else if (value.type == "ebook") {
                metrics.ebooks += 1
            } else if (value.metadata?.type == "DocumentType" && value.extension == "") {
                metrics.notebooks += 1
            }
        }
        return metrics
    },
});


export const highlightSelector = selector({
    key: 'highlightSelector',
    get: ({get}) => {
        const userFiles = get(indexAtom);

        console.log(userFiles)

        let pages: Highlight[][] = []
        let currentPageIndex = 1

        for (let [key, value] of userFiles) {
            for (let highlight of value.highlights) {
                if (pages.length < currentPageIndex) {
                    pages.push([])
                }

                if(pages[currentPageIndex - 1].length <= 10 && value.hasHighlights) {
                    pages[currentPageIndex - 1].push({
                        name: value.metadata!.name,
                        text: highlight
                    })
                }

                if (pages[currentPageIndex - 1].length >= 10) {
                    currentPageIndex += 1
                }
            }
        }
        return pages
    },
});
