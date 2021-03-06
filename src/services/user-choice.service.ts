import * as inquirer from 'inquirer';
import { injectable } from 'inversify';
import { map, Observable, take, shareReplay, switchMap, from } from 'rxjs';
import { CliOptions } from '../abstractions/cli-options';
import { TemplateService } from './template.service';

@injectable()
export class UserChoiceService {
    constructor(private templateService: TemplateService) {}

    selectTemplate(): Observable<CliOptions> {
        return this.templateService.getTemplates().pipe(
            map((t) => this.getQuestions(t)),
            switchMap((q) => inquirer.prompt(q)),
            map((answers: any) => {
                const projectChoice = answers['template'];
                const projectName = answers['name'];

                return {
                    itemName: projectName,
                    templateName: projectChoice,
                } as CliOptions;
            }),
            take(1),
            shareReplay(1)
        );
    }

    private getQuestions(
        templates: string[]
    ): Parameters<typeof inquirer.prompt>[0] {
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
