import {atom} from "recoil";

export interface DeviceStats {
    spaceAvailable: number
    spaceUsed: number
}

export const deviceStatsAtom = atom({
    key: 'deviceStats',
    default: {
        spaceAvailable: 0,
        spaceUsed: 0
    },
});
