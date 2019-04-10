import Base from './BaseClasses/Base';
import { EVENT } from './Enums';

export default class EventListeners extends Base {

  public subscribe(event: EVENT, cb: (...args: any[]) => void) {
    let eventData = this.EventListeners.find(r => r.event === event);
    if (eventData) {
      eventData.cb.push(cb);
    } else {
      eventData = {
        cb: [cb],
        // tslint:disable-next-line: object-shorthand-properties-first
        event,
      };
      this.EventListeners.push(eventData);
    }

    return () => {
      if (eventData) {
        const idx = eventData.cb.findIndex(r => r === cb);
        eventData.cb.splice(idx, 1);
      } else {
        throw new Error('Invalid event');
      }
    };
  }

  public run(event: EVENT, data: any) {
    const eventData = this.EventListeners.find(r => r.event === event);
    if (eventData) {
      eventData.cb.forEach((r) => {
        try {
          r(data);
        } finally {
          // continue
        }
      });
    }
  }
}
