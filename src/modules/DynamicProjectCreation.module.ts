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
        // ? Some templates might require name prior to starting... Leave for now, but keep in mind
        await this.process.execute(notification.command);
        // todo: forward to a module for optional setup, e.g. eslint, prettier, monorepo integration, etc...
        // ? Should the static template handler forward it as well?
    }
}
