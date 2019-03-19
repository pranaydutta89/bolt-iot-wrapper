import Base from "./Base";
import Api from "./Api";

export default class Analog extends Base {

    private api: Api = new Api();

    async loopRead(time: number, cb: (...args: any[]) => void) {
        if (time < 5000) {
            throw new Error('Time cannot be less than 5000 ms')
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
        const data = await this.api.getData('analogRead', `A0`);
        return parseInt(data.value, 10);
    }
}