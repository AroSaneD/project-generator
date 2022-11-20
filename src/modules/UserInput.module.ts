import { injectable } from 'inversify';
import { UserInputNotification } from '../events/UserInputNotification';
import { NotificationService } from '../services/Notification.service';
import { UserChoiceService } from '../services/UserChoice.service';

@injectable()
export class UserInputModule {
    constructor(private events: NotificationService, private userChoice: UserChoiceService) {}

    public async takeInput() {
        const templateName = await this.userChoice.selectTemplate();

        this.events.dispatchNotification(new UserInputNotification(templateName));
    }
}
