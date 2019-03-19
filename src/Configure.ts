import Base from "./Base";

export default class Configure extends Base {

    public config(deviceName: string, apiKey: string) {

        if (!this.ConfigDone) {
            this.ConfigDone = true;
            this.DeviceName = deviceName;
            this.ApiKey = apiKey;
        }
        else {
            throw new Error('Configuration already done');
        }
    }
}