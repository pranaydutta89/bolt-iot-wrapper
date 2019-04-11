import Analog from './Action/Analog';
import Digital from './Action/Digital';
import UART from './Action/UART';
import Utility from './Action/Utility';
import Base from './BaseClasses/Base';
import { EVENT, LOG_TYPE } from './Enums';
import EventListeners from './EventListeners';

class Devices extends Base {
  private eventListeners = new EventListeners();
  constructor() {
    super();
  }

  public read(deviceName: string) {

    if (this.isDeviceAdded(deviceName)) {
      return {
        Analog: new Analog(deviceName),
        Digital: new Digital(deviceName),
        UART: new UART(deviceName),
        Utility: new Utility(deviceName),
      };
    }
    const mesg = 'Device details are invalid';
    this.eventListeners.run(EVENT.message, LOG_TYPE.error, mesg);
    this.log(LOG_TYPE.error, mesg);
    return;
  }

  public isDeviceAdded(deviceName: string) {
    const checkExisting = this.Devices.find(r => r.name === deviceName);
    return !!checkExisting;
  }

  public add(deviceName: string, deviceKey: string) {
    if (deviceName && deviceKey &&
      typeof deviceName === 'string' && typeof deviceKey === 'string') {
      const checkExisting = this.Devices.find(r => r.name === deviceName);
      if (!checkExisting) {
        this.Devices.push({
          key: deviceKey,
          name: deviceName,
        });
        return this.read(deviceName);
      }
      const msg = `Device ${deviceName} already added`;
      this.eventListeners.run(EVENT.message, LOG_TYPE.error, msg);
      this.log(LOG_TYPE.error, msg);
      return;
    }
    const mesg = 'Device details are invalid';
    this.eventListeners.run(EVENT.message, LOG_TYPE.error, mesg);
    this.log(LOG_TYPE.error, mesg);
    return;
  }
}

export default new Devices();
