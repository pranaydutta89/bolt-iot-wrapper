import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';
import { CONSTANTS, PINS, STATE } from '../Enums';
import { IDigitalParam, IDigitalReturn } from '../Interfaces';

export default class Digital extends ActionBase {

  private api: Api = new Api(this.CurrentDevice);
  constructor(deviceName: string) {
    super(deviceName);
  }

  public async loopRead(pins: PINS | PINS[], time: number, cb: (...args: any[]) => void) {
    if (time < CONSTANTS.defaultLoopTime) {
      throw new Error(`Time cannot be less than ${CONSTANTS.defaultLoopTime} ms`);
    } else {
      while (1) {
        const data = await Promise.all([this.read(pins), this.setTimeoutAsync(time)]);
        try {
          cb(data[0]);
        } finally {
          // run after cb
        }
      }
    }
  }

  public async read(pins: PINS | PINS[]): Promise<IDigitalReturn | IDigitalReturn[]> {

    let pinsData: string;
    let data;
    if (pins instanceof Array) {
      pinsData = pins.join(',');
      data = await this.api.getData('digitalMultiRead', `pins=${pinsData}`);
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
    {
      pinsData = pins.toString();
      data = await this.api.getData('digitalRead', `pin=${pinsData}`);
      const returnData: IDigitalReturn = {
        pin: pins,
        state: data.value === '1' ? STATE.high : STATE.low,
      };
      return returnData;
    }
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
        this.api.getData('digitalMultiWrite', `pins=${pins.join(',')}&states=${state.join(',')}`);
    }

    return await this.api.getData('digitalWrite', `pin=${input.pin}&state=${input.state}`);

  }

}
