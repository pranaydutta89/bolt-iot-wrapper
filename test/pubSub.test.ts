import PubSub from '../src/PubSub';

describe('test pubSub', () => {

  test('pubsub integrity', () => {
    expect(PubSub.api).toBeDefined();
    expect(PubSub.message).toBeDefined();
  });

  test('api should work properly', () => {
    expect(typeof PubSub.api(() => true)).toBe('function');
    expect(typeof PubSub.message(() => true)).toBe('function');
  });
});
