import { ABaseNotification } from './ABaseNotification';

export class UserInputNotification extends ABaseNotification {
    constructor(public selectedTemplate: string) {
        super();
    }
}
