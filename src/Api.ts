import fetch from "node-fetch";
import Base from "./Base";
import { IResponseData } from "./Interfaces";
import { CONSTANTS } from './Enums';



export default class Api extends Base {

    private static lastApiCallTimeStamp: number;
    constructor() {
        super();
        this.checkConfig();
    }


    async getData(functi: string, query: string) {

        try {
            const fullUrl = `${CONSTANTS.baseUrl}/${this.ApiKey}/${functi}?deviceName=${this.DeviceName}&${query}`;
            const nowDate = Date.now();
            //below will give a gap of 3 seconds between api calls
            if (Api.lastApiCallTimeStamp && (nowDate - Api.lastApiCallTimeStamp) < CONSTANTS.defaultApiDiff) {
                await this.setTimeoutAsync(CONSTANTS.defaultApiDiff - (nowDate - Api.lastApiCallTimeStamp));
            }

            Api.lastApiCallTimeStamp = nowDate;
            const res = await fetch(fullUrl, {
                headers: {
                    'Cache-Control': "no-cache"
                }
            });
            const data: IResponseData = await res.json();
            if (data.success === '1') {
                return data;
            }

            throw new Error('Cloud responsed with failure');
        }
        catch (e) {
            return Promise.reject(e.message)
        }

    }
}