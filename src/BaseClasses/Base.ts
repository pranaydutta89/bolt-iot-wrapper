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
}
