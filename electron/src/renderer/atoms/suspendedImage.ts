import {atom} from "recoil";
import {Settings} from "_/common/settings";
import {ConnectionStatus} from "_/common/remarkableConnection";
import {LockscreenImage} from "_/common/lockscreen";

export const lockscreenImageAtom = atom<LockscreenImage>({
    key: 'lockscreenImage',
    default: {
        type: "lockscreen_image",
        data: "",
        name: "",
        lockscreenLoaded: false,
        lockscreenSynced: false,
        lockscreenLastSynced: new Date()
    },
});
