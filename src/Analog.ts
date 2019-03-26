import Base from "./ActionBase";
import Api from "./Api";
import { CONSTANTS } from './Enums';

export default class Analog extends Base {

    private api: Api = new Api(this.CurrentDevice);

    constructor(deviceName: string) {
        super(deviceName);
    }

    async loopRead(time: number, cb: (...args: any[]) => void) {
        if (time < CONSTANTS.defaultLoopTime) {
            throw new Error(`Time cannot be less than ${CONSTANTS.defaultLoopTime} ms`)
        }
        else {
            while (1) {
                const data = await Promise.all([this.read(), this.setTimeoutAsync(time)]);
                try {
                    cb(data[0]);
                }
                finally { }
            }
        }
    }
    async read(): Promise<number> {
        const data = await this.api.getData('analogRead', `pin=A0`);
        return parseInt(data.value, 10);
    }
}