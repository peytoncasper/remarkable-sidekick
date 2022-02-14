export type RemarkableDevice = "RM" | "RM2" | ""

export interface Settings {
    type: "settings"
    deviceType: RemarkableDevice
    host:       string
    username:   string
    password:   string
}
