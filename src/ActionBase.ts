import { IDeviceDetails } from './Interfaces';
import Base from './Base';


export default abstract class ActionBase extends Base {

    private static apiKey: string;
    private static configDone: boolean = false;
    protected static devices: Array<IDeviceDetails> = [];

    private currentDevice: IDeviceDetails | null = null;

    constructor(deviceName: string) {
        super();
        if (!(deviceName && ActionBase.devices.find(r => r.name === deviceName))) {

        }
    }

    protected set CurrentDevice(val: IDeviceDetails) {
        this.currentDevice = val;
    }

    protected get CurrentDevice() {
        if (this.currentDevice) {
            return this.currentDevice
        }
        throw new Error('Current Device not set');
    }


}