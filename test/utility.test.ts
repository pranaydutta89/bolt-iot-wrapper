import { Devices as instance, Utility } from '../src/exports';
import Utils from './Utils';

describe('test utility apis', () => {

  let utility: Utility;
  beforeAll(() => {
    utility = instance.add('demo', 'demo').Utility;
  });

  test('functions should be intact', () => {
    expect(utility.isOnline).toBeDefined();
    expect(utility.restart).toBeDefined();
    expect(utility.version).toBeDefined();
  });

  test('isOnline should work properly', async () => {
    // @ts-ignore
    jest.spyOn(utility.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'online',
      };
    });

    expect(await utility.isOnline()).toBe(true);
    // @ts-ignore
    expect(utility.api.getData).toBeCalledTimes(1);
  });

  test('restart should work Properly', async () => {
    // @ts-ignore
    jest.spyOn(utility.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: 'Restarted',
      };
    });

    expect(await utility.restart()).toBe(true);
    // @ts-ignore
    expect(utility.api.getData).toBeCalledTimes(1);
  });

  test('version should work properly', async () => {

    const rndStr = Utils.randomString();
    // @ts-ignore
    jest.spyOn(utility.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: rndStr,
      };
    });

    expect(await utility.version()).toBe(rndStr);
    // @ts-ignore
    expect(utility.api.getData).toBeCalledTimes(1);

  });

});
