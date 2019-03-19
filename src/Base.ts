

export default abstract class Base {
    private static deviceName: string;
    private static apiKey: string;
    private static configDone: boolean = false;
    private baseUrl = 'https://cloud.boltiot.com/remote';


    protected checkConfig() {
        if (!this.ConfigDone) {
            throw new Error('Configuration not done');
        }
    }

    protected get BaseUrl(): string {
        return this.baseUrl;
    }

    protected set DeviceName(val: string) {
        Base.deviceName = val;
    }

    protected get DeviceName() {
        return Base.deviceName;
    }


    protected set ApiKey(val: string) {
        Base.apiKey = val;
    }

    protected get ApiKey() {
        return Base.apiKey;
    }
    protected set ConfigDone(val: boolean) {
        Base.configDone = val;
    }

    protected get ConfigDone() {
        return Base.configDone;
    }

    protected setTimeoutAsync(time: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve();
            }, time)
        })
    }
}