import { API_STATUS } from '../src/Enums';
import { Analog, Devices as instance, Digital, Utility } from '../src/exports';
import Utils from './Utils';

describe('test utility apis', () => {

  let Utility: Utility;
  beforeAll(() => {
    Utility = instance.add('demo', 'demo').Utility;
  });

  test('functions should be intact', () => {
    expect(Utility.isOnline).toBeDefined();
    expect(Utility.restart).toBeDefined();
    expect(Utility.version).toBeDefined();
  });

  test('isOnline should work properly', async () => {
    // @ts-ignore
    jest.spyOn(Utility.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'online',
      };
    });

    expect(await Utility.isOnline()).toBe(true);
    expect(Utility.api.getData).toBeCalledTimes(1);
  });

  test('restart should work Properly', async () => {
    // @ts-ignore
    jest.spyOn(Utility.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'Restarted',
      };
    });

    expect(await Utility.restart()).toBe(true);
    expect(Utility.api.getData).toBeCalledTimes(1);
  });

  test('version should work properly', async () => {

    const rndStr = Utils.randomString();
    // @ts-ignore
    jest.spyOn(Utility.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: rndStr,
      };
    });

    expect(await Utility.version()).toBe(rndStr);
    expect(Utility.api.getData).toBeCalledTimes(1);

  });

});
