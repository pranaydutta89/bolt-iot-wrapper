import { API_STATUS } from '../src/Enums';
import { Analog, Devices as instance, Digital, Utility } from '../src/exports';
describe('test analog apis', () => {

  let analog: Analog;
  beforeAll(() => {
    analog = instance.add('demo', 'demo').Analog;
  });

  test('functions should be intact', () => {
    expect(analog.read).toBeDefined();
    expect(analog.loopRead).toBeDefined();
  });

  test('read should work properly', async () => {

    // @ts-ignore
    jest.spyOn(analog.api, 'getData').mockImplementation(async () => {
      return {
        success: 1,
        value: '10',
      };
    });
    const data = await analog.read();
    expect(analog.api.getData).toBeCalledTimes(1);
    expect(data).toBeDefined();
    expect(data).toBe(10);
  });

  test('loop read should work properly', async () => {
    expect(await analog.loopRead(1000, (data) => { return true })).toBeUndefined();
    jest.spyOn(analog, 'read').mockImplementation(async () => {
      return 10;
    });
    let cbCount = 0;
    const cb = (status, data) => {
      expect(status).toBe(API_STATUS.success);
      expect(data).toBe(10);
      return (cbCount += 1) < 5;
    };
    await analog.loopRead(4000, cb);
    expect(analog.read).toBeCalledTimes(5);
    expect(cbCount).toBe(5);
  });

  test('loop read should continue even after fail read', async () => {
    jest.spyOn(analog, 'read').mockImplementation(async () => {
      throw new Error('failed');
    });
    let cbCount = 0;
    const cb = (status, data) => {
      expect(status).toBe(API_STATUS.fail);
      return (cbCount += 1) < 5;
    };
    await analog.loopRead(4000, cb);
    expect(cbCount).toBe(5);
  });
});
