import { IDeviceDetails } from '../Interfaces';
import Base from './Base';

export default abstract class ActionBase extends Base {

  private currentDevice: IDeviceDetails | null = null;

  constructor(deviceName: string) {
    super();
    const tempDeivce = ActionBase.devices.find(r => r.name === deviceName);
    if (deviceName && tempDeivce) {
      this.currentDevice = tempDeivce;
    }
  }

  protected set CurrentDevice(val: IDeviceDetails) {
    this.currentDevice = val;
  }

  protected get CurrentDevice() {
    if (this.currentDevice) {
      return this.currentDevice;
    }
    throw new Error('Current Device not set');
  }

}
