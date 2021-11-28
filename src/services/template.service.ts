import { inject, injectable } from 'inversify';
import { Observable, of } from 'rxjs';
import { FileStreamService } from './filestream.service';
import { PathService } from './path.service';

interface ITemplate {
    name: string;
    path: string;
}

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
