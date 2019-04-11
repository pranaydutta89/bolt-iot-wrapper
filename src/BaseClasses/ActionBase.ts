import { EVENT, LOG_TYPE } from '../Enums';
import EventListeners from '../EventListeners';
import { IDeviceDetails } from '../Interfaces';
import Base from './Base';

export default abstract class ActionBase extends Base {

  protected set CurrentDevice(val: IDeviceDetails) {
    this.currentDevice = val;
  }

  protected get CurrentDevice() {
    if (this.currentDevice) {
      return this.currentDevice;
    }
    const msg = 'Cloud responded with failure';
    this.eventListeners.run(EVENT.message, LOG_TYPE.error, msg);
    this.log(LOG_TYPE.error, msg);
  }
  public eventListeners = new EventListeners();

  private currentDevice: IDeviceDetails | null = null;
  constructor(deviceName: string) {
    super();
    const tempDeivce = this.Devices.find(r => r.name === deviceName);
    if (deviceName && tempDeivce) {
      this.currentDevice = tempDeivce;
    }
  }
}
