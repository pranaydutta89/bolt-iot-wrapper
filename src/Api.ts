import fetch from "node-fetch";
import Base from "./Base";
import { IResponseData } from "./Interfaces";



export default class Api extends Base {
    constructor() {
        super();
        this.checkConfig();
    }


    async getData(functi: string, query: string) {

        try {
            const fullUrl = `${this.BaseUrl}/${this.ApiKey}/${functi}?deviceName=${this.DeviceName}&${query}`;
            const res = await fetch(fullUrl);
            const data: IResponseData = await res.json();
            if (data.success === '1') {
                return data;
            }

            throw new Error('Cloud responsed with failure')
        }
        catch (e) {
            return Promise.reject(e.message)
        }

    }
}