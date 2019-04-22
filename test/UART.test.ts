import { Devices as instance, UART } from '../src/exports';
import Utils from './Utils';
describe('test UART apis', () => {

  let uart: UART;
  beforeAll(() => {
    uart = instance.add('demo', 'demo').UART;
  });

  test('functions should be intact', () => {
    expect(uart.read).toBeDefined();
    expect(uart.begin).toBeDefined();
    expect(uart.readWrite).toBeDefined();
    expect(uart.write).toBeDefined();
  });

  test('read should work properly', async () => {

    const rndData = Utils.randomString();
    // @ts-ignore
    jest.spyOn(uart.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: rndData,
      };
    });
    const data = await uart.read(10);
    // @ts-ignore
    expect(uart.api.getData).toBeCalledTimes(1);
    expect(data).toBeDefined();
    expect(data).toBe(rndData);
  });

  test('begin should work properly', async () => {
    // @ts-ignore
    jest.spyOn(uart.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialBegin successful',
      };
    });
    expect(await uart.begin(111)).toBe(true);
    // @ts-ignore
    expect(uart.api.getData).toBeCalledTimes(1);
  });

  test('begin negative', async () => {

    // @ts-ignore
    jest.spyOn(uart.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialBegin failed',
      };
    });
    expect(await uart.begin(111)).toBe(false);
    // @ts-ignore
    expect(uart.api.getData).toBeCalledTimes(1);
  });

  test('write should work properly', async () => {
    // @ts-ignore
    jest.spyOn(uart.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialWrite successful',
      };
    });
    expect(await uart.write('hello')).toBe(true);
    // @ts-ignore
    expect(uart.api.getData).toBeCalledTimes(1);
  });

  test('negative write', async () => {
    // @ts-ignore
    jest.spyOn(uart.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialWrite ',
      };
    });
    expect(await uart.write('hello')).toBe(false);
    // @ts-ignore
    expect(uart.api.getData).toBeCalledTimes(1);
  });

  test('read write should work properly', async () => {
    // @ts-ignore
    jest.spyOn(uart.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'serialWrite ',
      };
    });
    expect(await uart.readWrite('hello', 10)).toBeDefined();
    // @ts-ignore
    expect(uart.api.getData).toBeCalledTimes(1);
  });
});
