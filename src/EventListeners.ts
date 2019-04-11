import Base from './BaseClasses/Base';
import { EVENT, LOG_TYPE } from './Enums';

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
        const mesg = 'Invalid event';
        this.run(EVENT.message, LOG_TYPE.error, mesg);
        this.log(LOG_TYPE.error, mesg);
      }
    };
  }

  public run(event: EVENT, ...args: any[]) {
    const eventData = this.EventListeners.find(r => r.event === event);
    if (eventData) {
      eventData.cb.forEach((r) => {
        try {
          r(...args);
        } finally {
          // continue
        }
      });
    }
  }
}
