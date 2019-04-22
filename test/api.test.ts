import Api from "../src/Api";
import Utils from "./Utils";
import { BOLT_FUNC } from "../src/Enums";

describe('test api without loader ', () => {
  let api: Api;

  beforeEach(() => {
    api = new Api({
      key: Utils.randomString(),
      name: Utils.randomString()
    });
  });

  test('functions should be intact', () => {
    expect(api.getData);
  });

  test('getData should work properly', async () => {

    const fetchData = {
      success: 1,
      value: '10',
    };
    // @ts-ignore
    jest.spyOn(api, 'fetch').mockImplementation(async () => {
      return {
        json: async () => fetchData
      };
    });
    const data = await api.getData(BOLT_FUNC.digitalMultiRead);
    expect(data).toEqual(fetchData);
  });

  test('Negative getData', async () => {

    await Utils.setTimeoutAsync(4000);
    const fetchData = {
      success: 0,
      value: '10',
    };
    // @ts-ignore
    jest.spyOn(api, 'fetch').mockImplementation(async () => {
      return {
        json: async () => fetchData
      };
    });
    try {
      const data = await api.getData(BOLT_FUNC.digitalMultiRead);
      expect(true).toBe(false)
    }
    catch (e) {
      expect(e.indexOf('Bolt cloud responded with failure')).not.toBe(-1);
    }
  });

  test('api fail scenario', async () => {

    await Utils.setTimeoutAsync(4000);
    // @ts-ignore
    jest.spyOn(api, 'fetch').mockImplementation(async () => {
      throw new Error('Failed')
    });
    try {
      const data = await api.getData(BOLT_FUNC.digitalMultiRead);
      expect(true).toBe(false)
    }
    catch (e) {
      expect(e).toBe("Failed");
    }
  });
});



describe('test api with loader', () => {
  let api: Api;

  beforeEach(() => {
    api = new Api({
      key: Utils.randomString(),
      name: Utils.randomString()
    }, true);
  });

  test('event listener should get called', async () => {


    await Utils.setTimeoutAsync(4000);
    //@ts-ignore
    jest.spyOn(api.eventListeners, 'run').mockImplementation(() => {
      return;
    });

    const fetchData = {
      success: 1,
      value: '10',
    };
    // @ts-ignore
    jest.spyOn(api, 'fetch').mockImplementation(async () => {
      return {
        json: async () => fetchData
      };
    });

    await api.getData(BOLT_FUNC.digitalMultiRead);

    //@ts-ignore
    expect(api.eventListeners.run).toBeCalledTimes(3);


  });
});