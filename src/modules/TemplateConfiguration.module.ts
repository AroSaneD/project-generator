import { injectable } from 'inversify';
import { ANotificationHandler } from '../events/ANotificationHandler';
import { StaticTemplateNotification } from '../events/StaticTemplateNotification';
import { UserInputNotification } from '../events/UserInputNotification';
import { NotificationService } from '../services/Notification.service';
import { TemplateService } from '../services/Template.service';
import { UserChoiceService } from '../services/UserChoice.service';

@injectable()
export class TemplateConfigurationHandler extends ANotificationHandler<UserInputNotification> {
    constructor(
        private templates: TemplateService,
        private userChoise: UserChoiceService,
        private notifications: NotificationService,
    ) {
        super();
    }

    async handle(notification: UserInputNotification): Promise<void> {
        const templateOptions = await this.templates.getTemplateDetails(
            notification.selectedTemplate,
        );

        if (templateOptions.options.isStatic) {
            return this.notifications.dispatchNotification(
                new StaticTemplateNotification(
                    await this.userChoise.selectProjectName(),
                    templateOptions.name,
                ),
            );
        }

        throw new Error('Method not implemented.');
    }
}
