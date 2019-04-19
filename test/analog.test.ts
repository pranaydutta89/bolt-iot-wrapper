import { Analog, Devices as instance, Digital, Utility } from '../src/exports';
describe('test analog apis', () => {

  let analog: Analog;
  beforeAll(() => {
    analog = instance.add('demo', 'demo').Analog;
  });

  test('functions should be intact', () => {
    expect(analog.read).toBeDefined();
    expect(analog.loopRead).toBeDefined();
  })
})