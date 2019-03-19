import Base from "./Base";
import Api from "./Api";

export default class Analog extends Base {

    private api: Api = new Api();
    async read(): Promise<number> {
        const data = await this.api.getData('analogRead', `A0`);
        return parseInt(data.value, 10);
    }
}