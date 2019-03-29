import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';
import { STATUS } from '../Enums';

export default class Utility extends ActionBase {

  private api: Api = new Api(this.CurrentDevice);

  constructor(deviceName: string) {
    super(deviceName);
  }

  public async isOnline() {
    const res = await this.api.getData('isOnline');
    return res.value === STATUS.online;
  }

  public async restart() {
    const res = await this.api.getData('restart');
    return res.value === 'Restarted';
  }

  public async version() {
    const res = await this.api.getData('version');
    return res.value;
  }
}
