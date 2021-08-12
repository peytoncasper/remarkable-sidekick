export type StorageDetailsType = "storage_details"

export interface StorageDetails {
    type?:   StorageDetailsType,
    used: number
    available: number
    paths:  Path[]
}

export interface Path {
    path:       string
    used:       number
    available:  number
}
