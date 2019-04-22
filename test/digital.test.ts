import { API_STATUS, BOLT_FUNC, PINS, STATE } from '../src/Enums';
import { Analog, Devices as instance, Digital, Utility } from '../src/exports';
import { IDigitalParam } from '../src/Interfaces';
import { IDigitalReturn } from './../dist/Interfaces.d';
describe('test digital apis', () => {

  let digital: Digital;
  beforeAll(() => {
    digital = instance.add('demo', 'demo').Digital;
  });

  test('functions should be intact', () => {
    expect(digital.read).toBeDefined();
    expect(digital.loopRead).toBeDefined();
    expect(digital.write).toBeDefined();
  });

  test('Write should work properly for single pin', async () => {

    // @ts-ignore
    jest.spyOn(digital.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: '1',
      };
    });
    const data = await digital.write({
      pin: PINS.zero,
      state: STATE.high,
    });
    // @ts-ignore
    expect(digital.api.getData).toBeCalledTimes(1);
    expect(data).toBeDefined();
  });

  test('Write should work properly for multiple pin', async () => {

    // @ts-ignore
    jest.spyOn(digital.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
      };
    });
    const data = await digital.write([{
      pin: PINS.zero,
      state: STATE.high,
    }, {
      pin: PINS.one,
      state: STATE.low,
    }]);
    // @ts-ignore
    expect(digital.api.getData).toBeCalledTimes(1);
    expect(data).toBeDefined();
  });

  test('read should work properly for single pin', async () => {

    // @ts-ignore
    jest.spyOn(digital.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: '1',
      };
    });
    const data = await digital.read(PINS.zero) as IDigitalParam;
    // @ts-ignore
    expect(digital.api.getData).toBeCalledTimes(1);
    expect(Object.keys(data).length).toBe(2);
    expect(data.pin).toBe(PINS.zero);
    expect(data.state).toBe(STATE.high);
  });

  test('read should work properly for multiple pin', async () => {

    // @ts-ignore
    jest.spyOn(digital.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: '1,0',
      };
    });
    const data = await digital.read([PINS.zero, PINS.one]) as IDigitalParam[];
    // @ts-ignore
    expect(digital.api.getData).toBeCalledTimes(1);
    expect(data.length).toBe(2);
    expect(data[0].pin).toBe(PINS.zero);
    expect(data[1].pin).toBe(PINS.one);
    expect(data[0].state).toBe(STATE.high);
    expect(data[1].state).toBe(STATE.low);
  });

  test('loop read should work properly', async () => {
    expect(await digital.loopRead([PINS.zero, PINS.one],
      // tslint:disable-next-line: align
      1000, (data: any) => true)).toBeUndefined();
    jest.spyOn(digital, 'read').mockImplementation(async () => {
      return [{
        pin: PINS.zero,
        state: STATE.high,
      }, {
        pin: PINS.one,
        state: STATE.low,
      }];
    });
    let cbCount = 0;
    const cb = (status, data: IDigitalReturn[]) => {
      expect(status).toBe(API_STATUS.success);
      expect(data[0].pin).toBe(PINS.zero);
      expect(data[1].pin).toBe(PINS.one);
      expect(data[0].state).toBe(STATE.high);
      expect(data[1].state).toBe(STATE.low);
      return (cbCount += 1) < 5;
    };
    await digital.loopRead([PINS.zero, PINS.one], 4000, cb);
    expect(digital.read).toBeCalledTimes(5);
    expect(cbCount).toBe(5);
  });

  test('loop read should continue even after fail read', async () => {
    jest.spyOn(digital, 'read').mockImplementation(async () => {
      throw new Error('failed');
    });
    let cbCount = 0;
    const cb = (status, data) => {
      expect(status).toBe(API_STATUS.fail);
      return (cbCount += 1) < 5;
    };
    await digital.loopRead(PINS.one, 4000, cb);
    expect(cbCount).toBe(5);
  });

});
