import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';
import { CONSTANTS, EVENT, LOG_TYPE } from '../Enums';
import EventListeners from '../EventListeners';

export default class Analog extends ActionBase {

  private api: Api = new Api(this.CurrentDevice);
  constructor(deviceName: string) {
    super(deviceName);
  }

  public async loopRead(time: number, cb: (...args: any[]) => boolean) {
    if (time < CONSTANTS.defaultLoopTime) {
      const msg = `Time cannot be less than ${CONSTANTS.defaultLoopTime} ms`;
      this.eventListeners.run(EVENT.message, LOG_TYPE.error, msg);
      this.log(LOG_TYPE.error, msg);
      return;
    }

    while (1) {
      const data = await Promise.all([this.read(), this.setTimeoutAsync(time)]);
      try {
        if (!cb(data[0])) {
          break;
        }
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
