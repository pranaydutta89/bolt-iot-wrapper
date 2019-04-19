import UART from '../src/Action/UART';
import { Devices } from '../src/Devices';
import { Analog, Devices as instance, Digital, Utility } from '../src/exports';
import Utils from './Utils';

describe('test device class', () => {

  test('devices class should be defined', () => {
    expect(instance).toBeDefined();
  });

  test('device should be intialised', () => {
    expect(instance).toBeInstanceOf(Devices);
  });

  test('devices method should be there', () => {
    expect(instance.read).toBeDefined();
    expect(instance.isDeviceAdded).toBeDefined();
    expect(instance.add).toBeDefined();
  });

  test('add Method should work properly', () => {
    const deviceDetails = Utils.randomString();
    const addDevice = instance.add(deviceDetails, deviceDetails);
    expect(addDevice.Analog).toBeInstanceOf(Analog);
    expect(addDevice.Digital).toBeInstanceOf(Digital);
    expect(addDevice.UART).toBeInstanceOf(UART);
    expect(addDevice.Utility).toBeInstanceOf(Utility);

    expect(instance.add(deviceDetails, deviceDetails)).toBeUndefined();
    // @ts-ignore
    expect(instance.add({}, {})).toBeUndefined();
  });

  test('read Method should work properly', () => {
    const deviceDetails = Utils.randomString();
    instance.add(deviceDetails, deviceDetails);
    const device = instance.read(deviceDetails);
    expect(device.Analog).toBeInstanceOf(Analog);
    expect(device.Digital).toBeInstanceOf(Digital);
    expect(device.UART).toBeInstanceOf(UART);
    expect(device.Utility).toBeInstanceOf(Utility);

    expect(instance.read(Utils.randomString())).toBeUndefined();
  });

  test('isDevice added should work properly', () => {
    const deviceDetails = Utils.randomString();
    instance.add(deviceDetails, deviceDetails);
    expect(instance.isDeviceAdded(deviceDetails)).toBe(true);
    expect(instance.isDeviceAdded(Utils.randomString())).toBe(false);
  });
});
