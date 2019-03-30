import nodeFetch from 'node-fetch';
import Base from './BaseClasses/Base';
import { CONSTANTS } from './Enums';
import { IDeviceDetails, IResponseData } from './Interfaces';

export default class Api extends Base {

  private static lastApiCallTimeStamp: number;
  private fetch: any = null;
  constructor(private currentDevice: IDeviceDetails) {
    super();
    if (this.IsNode) {
      this.fetch = nodeFetch;
    } else {
      this.fetch = window.fetch;
    }
  }

  public async getData(functi: string, query?: string) {

    try {
      let fullUrl;
      if (query) {
        fullUrl = `${CONSTANTS.baseUrl}/${this.currentDevice.key}/${functi}?
        deviceName=${this.currentDevice.name}&${query}`;
      } else {
        fullUrl = `${CONSTANTS.baseUrl}/${this.currentDevice.key}/${functi}?
        deviceName=${this.currentDevice.name}`;
      }
      const nowDate = Date.now();
      // below will give a gap of 3 seconds between api calls
      if (Api.lastApiCallTimeStamp &&
        (nowDate - Api.lastApiCallTimeStamp) < CONSTANTS.defaultApiDiff) {
        await this.setTimeoutAsync(CONSTANTS.defaultApiDiff - (nowDate - Api.lastApiCallTimeStamp));
      }

      Api.lastApiCallTimeStamp = nowDate;
      const res = await this.fetch(fullUrl.replace(/ /g, ''), {
        headers: {
          'Cache-Control': 'no-cache',
        },
      });
      const data: IResponseData = await res.json();
      if (data.success.toString() === '1') {
        return data;
      }

      throw new Error('Cloud responsed with failure');
    } catch (e) {
      return Promise.reject(e.message);
    }

  }
}
