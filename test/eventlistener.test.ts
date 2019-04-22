import { EVENT } from '../src/Enums';
import EventListeners from '../src/EventListeners';

describe('test event listener', () => {
  let instance: EventListeners;
  beforeAll(() => {
    instance = new EventListeners();
  });

  test('check integrity', () => {
    expect(instance.run).toBeDefined();
    expect(instance.subscribe).toBeDefined();
  });

  test('Subscribe should work properly', () => {
    const event = instance.subscribe(EVENT.api, () => true);
    expect(typeof event).toBe('function');
    event();
  });

  test('Run function should work properly', () => {
    let count = 0;
    const cb = () => {
      count += 1;
    };
    const event = instance.subscribe(EVENT.api, cb);
    const event1 = instance.subscribe(EVENT.api, cb);
    const event2 = instance.subscribe(EVENT.message, cb);
    instance.run(EVENT.api);
    expect(count).toBe(2);
    event();
    event1();
    instance.run(EVENT.api);
    expect(count).toBe(2);
    instance.run(EVENT.message);
    expect(count).toBe(3);

  });

});
