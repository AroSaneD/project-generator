import { inject, injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { FileStreamService } from './Filestream.service';
import { PathService } from './Path.service';

interface ITemplate {
    name: string;
    path: string;
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
        private fs: FileStreamService
    ) {}

    getTemplates(): Observable<string[]> {
        return of(this.fs.readdirSync(this.templatesPath));
    }

    getTemplateDetails(templateName: string): Observable<ITemplate> {
        const templatePath = this.path.join(this.templatesPath, templateName);

        return of({
            name: templateName,
            path: templatePath,
        });
    }
}
