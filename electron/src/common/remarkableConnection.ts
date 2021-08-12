
export type ConnectType = "connect"
export type ConnectionStatusType = "connection_status"
export type GetSuspendedImage = "get_suspended_image"

export interface Connect {
    type: ConnectType
}

export interface ConnectionStatus {
    type: ConnectionStatusType,
    status: string
}
