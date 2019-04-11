import { LOG_TYPE } from '../Enums';
import { IDeviceDetails } from '../Interfaces';
import { IEventListeners } from './../Interfaces';

export default abstract class Base {

  private static devices: IDeviceDetails[] = [];
  private static eventListeners: IEventListeners[] = [];
  protected setTimeoutAsync(time: number) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve();
        // tslint:disable-next-line: align
      }, time);
    });
  }

  protected get EventListeners() {
    return Base.eventListeners;
  }
  protected get Devices() {
    return Base.devices;
  }

  protected get IsNode() {
    return typeof process !== 'undefined' && process.release && process.release.name === 'node';
  }

  protected log(type: LOG_TYPE, message: string) {
    switch (type) {
      case LOG_TYPE.info:
        // tslint:disable-next-line: no-console
        console.info(`Bolt-IOT-Wrapper--- ${message}`);
        break;
      case LOG_TYPE.warn:
        // tslint:disable-next-line: no-console
        console.warn(`Bolt-IOT-Wrapper--- ${message}`);
        break;
      case LOG_TYPE.error:
        // tslint:disable-next-line: no-console
        console.error(`Bolt-IOT-Wrapper--- ${message}`);
    }
  }
}
