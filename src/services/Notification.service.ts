import { injectable } from 'inversify';
import { ReplaySubject } from 'rxjs';
import { ABaseNotification } from '../events/ABaseNotification';

// todo: split dispatch, observer and 'router'
@injectable()
export class NotificationService {
    public events = new ReplaySubject<ABaseNotification>(1);

    public dispatchNotification(notification: ABaseNotification) {
        this.events.next(notification);
    }
}
