import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';
import { API_STATUS, BOLT_FUNC, CONSTANTS, EVENT, LOG_TYPE, PINS } from '../Enums';
import { IPWMParam } from '../Interfaces';

export default class Analog extends ActionBase {

  private api: Api = new Api(this.CurrentDevice, this.showLoader);
  constructor(deviceName: string, private showLoader?: boolean) {
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
      try {
        await this.setTimeoutAsync(time);
        const data = await this.read();
        if (!cb(API_STATUS.success, data)) {
          break;
        }
      } catch (e) {
        // catch the excception the continue the loop
        if (!cb(API_STATUS.fail, {})) {
          break;
        }
      } finally {
        // run after cb
      }
    }

  }
  public async read(): Promise<number> {
    const data = await this.api.getData(BOLT_FUNC.analogRead, 'pin=A0');
    return parseInt(data.value, 10);
  }

  public async pwm(input: IPWMParam | IPWMParam[]) {
    if (input instanceof Array) {
      const pins: PINS[] = [];
      const values: number[] = [];
      input.forEach((val) => {
        pins.push(val.pin);
        values.push(val.value);
      });

      return await
        this.api.
          getData(BOLT_FUNC.analogWrite, `pin=${pins.join(',')}&value=${values.join(',')}`);
    }

    return await this.api.getData(BOLT_FUNC.analogWrite, `pin=${input.pin}&value=${input.value}`);
  }
}
