import Api from '../Api';
import ActionBase from '../BaseClasses/ActionBase';

export default class UART extends ActionBase {

  private api: Api = new Api(this.CurrentDevice);

  constructor(deviceName: string) {
    super(deviceName);
  }

  public async begin(baudRate: number): Promise<boolean> {
    const res = await this.api.getData('serialBegin', `baud=${baudRate}`);
    return res.value === 'serialBegin successful';
  }

  public async write(data: string): Promise<boolean> {
    const res = await this.api.getData('serialWrite', `data=${data}`);
    return res.value === 'serialWrite successful';
  }

  public async read(till: number): Promise<string> {
    const res = await this.api.getData('serialRead', `till=${till}`);
    return res.value;
  }

  public async readWrite(data: string, till: number) {
    const res = await this.api.getData('serialWR', `till=${till}&data=${data}`);
    return res.value;
  }
}
