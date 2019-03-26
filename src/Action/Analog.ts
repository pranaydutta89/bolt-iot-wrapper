import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';
import { CONSTANTS } from '../Enums';

export default class Analog extends ActionBase {

  private api: Api = new Api(this.CurrentDevice);

  constructor(deviceName: string) {
    super(deviceName);
  }

  public async loopRead(time: number, cb: (...args: any[]) => void) {
    if (time < CONSTANTS.defaultLoopTime) {
      throw new Error(`Time cannot be less than ${CONSTANTS.defaultLoopTime} ms`);
    }

    while (1) {
      const data = await Promise.all([this.read(), this.setTimeoutAsync(time)]);
      try {
        cb(data[0]);
      } finally {
        // keep executing after cb
      }
    }

  }
  public async read(): Promise<number> {
    const data = await this.api.getData('analogRead', 'pin=A0');
    return parseInt(data.value, 10);
  }
}
