import {atom} from "recoil";

export interface Success {
    type?: string
    message: string
    timeout: number
}

export const successMessageAtom = atom({
    key: 'success',
    default: {
        message: "",
        timeout: 0
    },
});
