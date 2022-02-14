import {Image} from "_/common/image";

export interface FileObject {
    id: string
    extension: string
    type: string
    hasHighlights: boolean
    highlights: string[]
    metadata?: ObjectMetadata
}

export interface ObjectMetadata {
    id: string,
    deleted: boolean,
    lastModified: Date,
    lastOpened: Date,
    lastOpenedPage: number,
    metadataModified: boolean,
    modified: boolean,
    parentId: string,
    pinned: boolean,
    synced: boolean,
    type: 'DocumentType' | 'CollectionType'
    version: number
    name: string
}

export interface IndexEntry {
    objectMetadata: ObjectMetadata
}

export interface Index {
    type: "get_index"
    index: Map<string, FileObject>
}
