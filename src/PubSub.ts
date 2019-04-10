import Base from './BaseClasses/Base';
import { API_PHASE, EVENT } from './Enums';
import EventListeners from './EventListeners';

class PubSub extends Base {

  private eventListener = new EventListeners();

  public api(cb: (phase: API_PHASE) => void) {
    return this.eventListener.subscribe(EVENT.api, cb);
  }
}

export default new PubSub();
