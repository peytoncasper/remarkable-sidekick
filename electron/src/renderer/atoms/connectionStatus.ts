import {atom} from "recoil";
import {Settings} from "_/common/settings";
import {ConnectionStatus} from "_/common/remarkableConnection";

export const connectionStatusAtom = atom<ConnectionStatus>({
    key: 'connectionStatus',
    default: {
        type: "connection_status",
        status: "disconnected"
    },
});
