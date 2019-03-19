import Base from "./Base";
import { PINS } from "./Constants";
import { DigitalParam } from "./Interfaces";
import Api from "./Api";


export default class Digital extends Base {

    private api: Api = new Api();
    constructor() {
        super();
    }


    async read(pins: PINS | PINS[]) {
        if (pins instanceof Array) {
            const url = `digitalRead?pin=${pins}`
            this.api.getData()
        }
        else {

        }
    }

    async write(input: DigitalParam | DigitalParam[]) {

    }

}