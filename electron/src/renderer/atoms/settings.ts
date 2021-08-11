import {atom} from "recoil";
import {Settings} from "_/common/settings";

export const settingsAtom = atom<Settings>({
    key: 'settings',
    default: {
        host: "",
        username: "",
        password: "",
        deviceType: ""
    },
});
