import {atom} from "recoil";
import {Settings} from "_/common/settings";
import {ConnectionStatus} from "_/common/remarkableConnection";
import {StorageDetails} from "_/common/storage";
import {Image} from "_/common/image";

export const localImagesAtom = atom<Image[]>({
    key: 'localImages',
    default: [],
});
