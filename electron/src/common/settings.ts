export type RemarkableDevice = "RM" | "RM2" | ""

export interface Settings {
    deviceType: RemarkableDevice
    host:       string
    username:   string
    password:   string
}
