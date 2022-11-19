import { ABaseNotification } from './ABaseNotification';

export class StaticTemplateNotification extends ABaseNotification {
    constructor(public projectName: string, public selectedTemplate: string) {
        super();
    }
}
