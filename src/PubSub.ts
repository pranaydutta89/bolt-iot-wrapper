import Base from './BaseClasses/Base';
import { API_PHASE, EVENT, LOG_TYPE } from './Enums';
import EventListeners from './EventListeners';

class PubSub extends Base {

  private eventListener = new EventListeners();

  public api(cb: (phase: API_PHASE) => void) {
    return this.eventListener.subscribe(EVENT.api, cb);
  }

  public message(cb: (phase: LOG_TYPE, message: string) => void) {
    return this.eventListener.subscribe(EVENT.message, cb);
  }
}

export default new PubSub();
