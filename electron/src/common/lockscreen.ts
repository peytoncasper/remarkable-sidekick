export type LockscreenImageType = "lockscreen_image"

export interface LockscreenImage {
    type:   LockscreenImageType
    name:   string
    data:   string
    lockscreenLoaded: boolean
    lockscreenSynced: boolean
    lockscreenLastSynced: Date
}
