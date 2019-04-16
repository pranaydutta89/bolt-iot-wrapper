import { Devices } from '../src/Devices';
import { Devices as instance } from '../src/exports';

describe('test device class', () => {

  test('devices class should be defined', () => {
    expect(instance).toBeDefined();
  });

  test('device should be intialised', () => {
    expect(instance).toBeInstanceOf(Devices)
  })
});
