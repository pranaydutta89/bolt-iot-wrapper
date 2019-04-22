import { API_STATUS } from '../src/Enums';
import { Analog, Devices as instance, Digital, Utility, UART } from '../src/exports';
import Utils from './Utils';
describe('test UART apis', () => {

  let UART: UART;
  beforeAll(() => {
    UART = instance.add('demo', 'demo').UART;
  });

  test('functions should be intact', () => {
    expect(UART.read).toBeDefined();
    expect(UART.begin).toBeDefined();
    expect(UART.readWrite).toBeDefined();
    expect(UART.write).toBeDefined();
  });

  test('read should work properly', async () => {

    const rndData = Utils.randomString();
    // @ts-ignore
    jest.spyOn(UART.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: rndData,
      };
    });
    const data = await UART.read(10);
    expect(UART.api.getData).toBeCalledTimes(1);
    expect(data).toBeDefined();
    expect(data).toBe(rndData);
  });

  test('begin should work properly', async () => {
    // @ts-ignore
    jest.spyOn(UART.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialBegin successful',
      };
    });
    expect(await UART.begin(111)).toBe(true);
    expect(UART.api.getData).toBeCalledTimes(1);
  });

  test('begin negative', async () => {

    // @ts-ignore
    jest.spyOn(UART.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialBegin failed',
      };
    });
    expect(await UART.begin(111)).toBe(false);
    expect(UART.api.getData).toBeCalledTimes(1);
  });

  test('write should work properly', async () => {
    // @ts-ignore
    jest.spyOn(UART.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialWrite successful',
      };
    });
    expect(await UART.write('hello')).toBe(true);
    expect(UART.api.getData).toBeCalledTimes(1);
  });

  test('negative write', async () => {
    // @ts-ignore
    jest.spyOn(UART.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialWrite ',
      };
    });
    expect(await UART.write('hello')).toBe(false);
    expect(UART.api.getData).toBeCalledTimes(1);
  });

  test('read write should work properly', async () => {
    // @ts-ignore
    jest.spyOn(UART.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialWrite ',
      };
    });
    expect(await UART.readWrite('hello', 10)).toBeDefined();
    expect(UART.api.getData).toBeCalledTimes(1);
  });
});
