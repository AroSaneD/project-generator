import { UserInputNotification } from '../events/UserInputNotification';
import { EventService } from '../services/Notification.service';
import { UserChoiceService } from '../services/UserChoice.service';

export class UserInputModule {
    constructor(private events: EventService, private userChoice: UserChoiceService) {}

    public async takeInput() {
        const choices = await this.userChoice.selectTemplate();

        this.events.dispatchEvent(
            new UserInputNotification(choices.itemName, choices.templateName),
        );
    }
}
