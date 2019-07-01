import { EVENT, PINS, STATE } from './Enums';

export interface IDigitalParam {
  pin: PINS;
  state: STATE;
}

export interface IPWMParam {
  pin: PINS;
  value: number;
}

export interface IDeviceDetails {
  name: string;
  key: string;
}

export interface IDigitalReturn {
  pin: PINS;
  state: STATE;
}

export interface IEventListeners {
  event: EVENT;
  cb: [(...args: any[]) => void];
}

export interface IResponseData {
  success: number;
  value: any;
}
