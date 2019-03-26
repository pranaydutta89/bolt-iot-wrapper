import Base from './ActionBase';
import { Analog } from './exports';


export default class Devices extends Base {
    constructor() {
        super();
    }

    read(deviceName: string) {
        return {
            analog: new Analog()
        }
    }

    add(deviceName: string, deviceKey: string) {
        if (deviceName && deviceKey && typeof deviceName === 'string' && typeof deviceKey === 'string') {
            Base.devices.push({
                name: deviceName,
                key: deviceKey
            })
        }

        throw new Error('Device details are invalid')
    }
}