import fetch from "node-fetch";
import Base from "./Base";



export default class Api extends Base {
    constructor() {
        super();
        this.checkConfig();
    }


    async getData(url: string) {

        try {
            const fullUrl = `${this.BaseUrl}/${this.ApiKey}/${url}&deviceName=${this.DeviceName}`;
            const res = await fetch(fullUrl);
            return await res.json();
        }
        catch (e) {

        }

    }
}