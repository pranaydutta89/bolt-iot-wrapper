import xhr, { XhrResponse } from "xhr";
import Base from "./Base";
import { IResponseData } from "./Interfaces";
import { resolve } from 'url';
import { CONSTANTS } from './Enums';



export default class Api extends Base {

    private static lastApiCallTimeStamp: number;
    constructor() {
        super();
        this.checkConfig();
    }


    async getData(functi: string, query: string) {

        try {
            const fullUrl = `${this.BaseUrl}/${this.ApiKey}/${functi}?deviceName=${this.DeviceName}&${query}`;
            const nowDate = Date.now();
            //below will give a gap of 3 seconds between api calls
            if (Api.lastApiCallTimeStamp && (nowDate - Api.lastApiCallTimeStamp) < CONSTANTS.defaultApiDiff) {
                await this.setTimeoutAsync(CONSTANTS.defaultApiDiff - (nowDate - Api.lastApiCallTimeStamp));
            }

            Api.lastApiCallTimeStamp = nowDate;
            const data: IResponseData = await new Promise((resolve, reject) => {
                xhr({
                    method: "GET",
                    uri: fullUrl,
                    headers: {
                        'Cache-Control': "no-cache"
                    }
                }, (err: Error, resp: XhrResponse, body: any) => {

                    if (err) {
                        return reject(err);
                    }

                    if (resp.statusCode === 200) {
                        if (body.success === '1') {
                            return resolve(body);
                        }
                        else {
                            return reject(body);
                        }
                    }
                    else {
                        return reject(resp);
                    }
                })
            })

            return data;
        }
        catch (e) {
            return Promise.reject(e.message)
        }

    }
}