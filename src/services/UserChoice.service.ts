import * as inquirer from 'inquirer';
import { injectable } from 'inversify';
import { TemplateService } from './Template.service';

@injectable()
export class UserChoiceService {
    constructor(private templateService: TemplateService) {}

    async selectTemplate(): Promise<string> {
        const template = await this.templateService.getTemplates();
        // const questions = this.getQuestions(template);
        const answers = await (inquirer.prompt({
            name: 'template',
            type: 'list',
            message: 'What project template would you like to use?',
            choices: template,
        }) as Promise<{ template: string }>);

        const projectChoice = answers.template;
        // const projectName = answers.name;

        return projectChoice;
    }

    async selectProjectName(): Promise<string> {
        const answers = await (inquirer.prompt({
            name: 'name',
            type: 'input',
            message: 'New project name?',
        }) as Promise<{ name: string }>);

        return answers.name;
    }
}
