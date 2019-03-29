import Analog from './Action/Analog';
import Digital from './Action/Digital';
import UART from './Action/UART';
import Utility from './Action/Utility';
import Base from './BaseClasses/Base';

class Devices extends Base {
  constructor() {
    super();
  }

  public read(deviceName: string) {
    return {
      Analog: new Analog(deviceName),
      Digital: new Digital(deviceName),
      UART: new UART(deviceName),
      Utility: new Utility(deviceName),
    };
  }

  public add(deviceName: string, deviceKey: string) {
    if (deviceName && deviceKey &&
      typeof deviceName === 'string' && typeof deviceKey === 'string') {
      const checkExisting = Base.devices.find(r => r.name === deviceName);
      if (!checkExisting) {
        Base.devices.push({
          key: deviceKey,
          name: deviceName,
        });
        return this.read(deviceName);
      }
      throw new Error(`Device ${deviceName} already added`);
    }

    throw new Error('Device details are invalid');
  }
}

export default new Devices();
