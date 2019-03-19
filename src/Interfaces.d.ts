import { PINS, STATE } from "./Enums";

export interface IDigitalParam {
    pin: PINS,
    state: STATE
}


export interface IDigitalReturn {
    pin: PINS,
    state: STATE
}

export interface IResponseData {
    success: string,
    value: any
}