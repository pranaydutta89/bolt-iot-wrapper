import Analog from './Analog';
import Base from './Base';
import Digital from './Digital';
import Utility from './Utility';

export default class Devices extends Base {
  constructor() {
    super();
  }

  public read(deviceName: string) {
    return {
      Analog: new Analog(deviceName),
      Digital: new Digital(deviceName),
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
      } else {
        throw new Error(`Device ${deviceName} already added`);
      }
    }

    throw new Error('Device details are invalid');
  }
}
