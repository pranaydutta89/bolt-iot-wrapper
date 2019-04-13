import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';
import { API_STATUS, BOLT_FUNC, CONSTANTS, EVENT, LOG_TYPE, PINS, STATE } from '../Enums';
import { IDigitalParam, IDigitalReturn } from '../Interfaces';

export default class Digital extends ActionBase {

  private api: Api = new Api(this.CurrentDevice, this.showLoader);
  constructor(deviceName: string, private showLoader?: boolean) {
    super(deviceName);
  }

  public async loopRead(
    pins: PINS | PINS[], time: number,
    cb: (status: API_STATUS, args: IDigitalReturn | IDigitalReturn[] | {}) => boolean) {
    if (time < CONSTANTS.defaultLoopTime) {
      const msg = `Time cannot be less than ${CONSTANTS.defaultLoopTime} ms`;
      this.eventListeners.run(EVENT.message, LOG_TYPE.error, msg);
      this.log(LOG_TYPE.error, msg);
      return;
    }

    while (1) {
      try {
        await this.setTimeoutAsync(time);
        const data = await this.read(pins);
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

  public async read(pins: PINS | PINS[]): Promise<IDigitalReturn | IDigitalReturn[]> {

    let pinsData: string;
    let data;
    if (pins instanceof Array) {
      pinsData = pins.join(',');
      data = await this.api.getData(BOLT_FUNC.digitalMultiRead, `pins=${pinsData}`);
      const pinsResponses = data.value.split(',');
      const returnData: IDigitalReturn[] = [];
      pinsResponses.forEach((element: string, idx: number) => {
        returnData.push({
          pin: pins[idx],
          state: element === '1' ? STATE.high : STATE.low,
        });
      });
      return returnData;
    }

    pinsData = pins.toString();
    data = await this.api.getData(BOLT_FUNC.digitalRead, `pin=${pinsData}`);
    const returnDat: IDigitalReturn = {
      pin: pins,
      state: data.value === '1' ? STATE.high : STATE.low,
    };
    return returnDat;

  }

  public async write(input: IDigitalParam | IDigitalParam[]) {

    if (input instanceof Array) {
      const pins: PINS[] = [];
      const state: STATE[] = [];
      input.forEach((val) => {
        pins.push(val.pin);
        state.push(val.state);
      });

      return await
        this.api.
          getData(BOLT_FUNC.digitalMultiWrtie, `pins=${pins.join(',')}&states=${state.join(',')}`);
    }

    return await this.api.getData(BOLT_FUNC.digitalWrite, `pin=${input.pin}&state=${input.state}`);

  }

}
