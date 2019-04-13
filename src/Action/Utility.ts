import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';
import { BOLT_FUNC, STATUS } from '../Enums';

export default class Utility extends ActionBase {

  private api: Api = new Api(this.CurrentDevice, this.showLoader);

  constructor(deviceName: string, private showLoader?: boolean) {
    super(deviceName);
  }

  public async isOnline() {
    const res = await this.api.getData(BOLT_FUNC.isOnline);
    return res.value === STATUS.online;
  }

  public async restart() {
    const res = await this.api.getData(BOLT_FUNC.restart);
    return res.value === 'Restarted';
  }

  public async version() {
    const res = await this.api.getData(BOLT_FUNC.version);
    return res.value;
  }
}
