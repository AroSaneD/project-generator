import { BaseUserInput } from '../options/BaseUserInput';
import { ABaseNotification } from './ABaseNotification';

export class UserInputNotification extends ABaseNotification implements BaseUserInput {
    constructor(public projectName: string, public selectedTemplate: string) {
        super();
    }
}
