import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';
import { BOLT_FUNC } from '../Enums';

export default class UART extends ActionBase {

  private api: Api = new Api(this.CurrentDevice, this.showLoader);

  constructor(deviceName: string, private showLoader?: boolean) {
    super(deviceName);
  }

  public async begin(baudRate: number): Promise<boolean> {
    const res = await this.api.getData(BOLT_FUNC.serialBegin, `baud=${baudRate}`);
    return res.value === 'serialBegin successful';
  }

  public async write(data: string): Promise<boolean> {
    const res = await this.api.getData(BOLT_FUNC.serialWrite, `data=${data}`);
    return res.value === 'serialWrite successful';
  }

  public async read(till: number): Promise<string> {
    const res = await this.api.getData(BOLT_FUNC.serialRead, `till=${till}`);
    return res.value;
  }

  public async readWrite(data: string, till: number) {
    const res = await this.api.getData(BOLT_FUNC.serialWR, `till=${till}&data=${data}`);
    return res.value;
  }
}
