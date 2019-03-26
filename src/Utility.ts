import Base from './ActionBase';
import Api from './Api';
import { STATUS } from './Enums';

export default class Utility extends Base {

    private api: Api = new Api();

    async isOnline() {
        const res = await this.api.getData('isOnline');
        return res.value === STATUS.online;
    }
}