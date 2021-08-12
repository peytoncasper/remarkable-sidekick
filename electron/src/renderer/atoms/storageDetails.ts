import {atom} from "recoil";
import {Settings} from "_/common/settings";
import {ConnectionStatus} from "_/common/remarkableConnection";
import {StorageDetails} from "_/common/storage";

export const storageDetailsAtom = atom<StorageDetails>({
    key: 'storageDetails',
    default: {
        used: 0,
        available: 0,
        paths: []
    },
});
