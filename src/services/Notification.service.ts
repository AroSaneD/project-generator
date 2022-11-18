import { injectable } from 'inversify';
import { ReplaySubject } from 'rxjs';
import { ABaseNotification } from '../events/ABaseNotification';

// todo: split dispatch, observer and 'router'
@injectable()
export class EventService {
    public events = new ReplaySubject<ABaseNotification>(1);

    public dispatchEvent(event: ABaseNotification) {
        this.events.next(event);
    }
}
