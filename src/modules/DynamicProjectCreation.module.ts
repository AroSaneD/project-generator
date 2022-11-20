import { injectable } from 'inversify';
import { ANotificationHandler } from '../events/ANotificationHandler';
import { DynamicTemplateNotification } from '../events/DynamicTemplateNotification';
import { ProcessService } from '../services/Process.service';

@injectable()
export class DynamicProjectCreationModule extends ANotificationHandler<DynamicTemplateNotification> {
    constructor(private process: ProcessService) {
        super();
    }

    async handle(notification: DynamicTemplateNotification): Promise<void> {
        this.process.execute(notification.command);
    }
}
