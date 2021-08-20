import {atom} from "recoil";

export interface Error {
    type?: string
    message: string
    timeout: number
}

export const errorAtom = atom({
    key: 'error',
    default: {
        message: "",
        timeout: 0
    },
});
