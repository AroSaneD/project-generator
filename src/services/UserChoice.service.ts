import * as inquirer from 'inquirer';
import { injectable } from 'inversify';
import { CliOptions } from '../abstractions/CliOptions';
import { TemplateService } from './Template.service';

type PromptResponse = { template: string; name: string };

@injectable()
export class UserChoiceService {
    constructor(private templateService: TemplateService) {}

    async selectTemplate(): Promise<CliOptions> {
        const template = await this.templateService.getTemplates();
        const questions = this.getQuestions(template);
        const answers = await (inquirer.prompt(questions) as Promise<PromptResponse>);

        const projectChoice = answers.template;
        const projectName = answers.name;

        return {
            itemName: projectName,
            templateName: projectChoice,
        } as CliOptions;
    }

    private getQuestions(templates: string[]): Parameters<typeof inquirer.prompt>[0] {
        return [
            {
                name: 'template',
                type: 'list',
                message: 'What project template would you like to use?',
                choices: templates,
            },
            {
                name: 'name',
                type: 'input',
                message: 'New project name?',
            },
        ];
    }
}
