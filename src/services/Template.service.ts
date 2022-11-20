import { inject, injectable } from 'inversify';
import { ITemplateOptions } from '../abstractions/ITemplateOptions';
import { FileStreamService } from './Filestream.service';
import { PathService } from './Path.service';

interface ITemplate {
    name: string;
    path: string;
    options: ITemplateOptions;
}

// todo: Currently only supports one type of templates.
// add multiple types. For now, a 'basic' and 'external' folders might be enough
// The folders themselves will need to contain dynamic logic to allow overrides.
// Maybe a #dynamic/index.ts? Will need to ignore in create-project module
@injectable()
export class TemplateService {
    constructor(
        @inject('templatesPath') private templatesPath: string,
        private path: PathService,
        private fs: FileStreamService,
    ) {}

    async getTemplates(): Promise<string[]> {
        return this.fs.readdirSync(this.templatesPath);
    }

    async getTemplateDetails(templateName: string): Promise<ITemplate> {
        const templatePath = this.path.join(this.templatesPath, templateName);
        const optionsPath = this.path.join(
            this.templatesPath,
            templateName,
            '#config',
            'options.json',
        );

        const templateOptions = this.fs.existsSync(optionsPath)
            ? (JSON.parse(this.fs.readFileSync(optionsPath)) as ITemplateOptions)
            : ({ isStatic: false } as ITemplateOptions);

        console.log('Template options: ', templateOptions);

        return {
            name: templateName,
            path: templatePath,
            options: templateOptions,
        };
    }
}
