import ActionBase from './ActionBase';
import Api from './Api';
import { STATUS } from './Enums';

export default class Utility extends ActionBase {

    private api: Api = new Api(this.CurrentDevice);

    constructor(deviceName: string) {
        super(deviceName);
    }

    async isOnline() {
        const res = await this.api.getData('isOnline');
        return res.value === STATUS.online;
    }

    async restart() {
        const res = await this.api.getData('restart');
        return res.value === 'Restarted';
    }

    async version() {
        const res = await this.api.getData('restart');
        return res.value;
    }
}