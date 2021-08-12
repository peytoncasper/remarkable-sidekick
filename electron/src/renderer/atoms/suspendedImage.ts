import {atom} from "recoil";
import {Settings} from "_/common/settings";
import {ConnectionStatus} from "_/common/remarkableConnection";

export interface SuspendedImage {
    data: string
}

export const suspendedImageAtom = atom<SuspendedImage>({
    key: 'suspendedImage',
    default: {
        data: "",
    },
});
