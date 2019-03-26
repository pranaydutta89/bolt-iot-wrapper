import { IDeviceDetails } from './Interfaces';


export default abstract class Base {

    protected static devices: Array<IDeviceDetails> = [];
    protected setTimeoutAsync(time: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time)
        })
    }
}