import { inject, injectable } from 'inversify';
import { map, Observable } from 'rxjs';
import { AModule } from '../abstractions/a-module';
import { CliOptions } from '../abstractions/cli-options';
import { FileStreamService } from '../services/filestream.service';
import { PathService } from '../services/path.service';
import { TemplateService } from '../services/template.service';
import { render } from '../utils/template';

@injectable()
export class CreateProjectModule extends AModule {
    private readonly SKIP_FILES = ['node_modules', '.template.json'];

    constructor(
        @inject('currDir') private currDir: string,
        private path: PathService,
        private fs: FileStreamService,
        private templates: TemplateService,
        @inject('options') options: CliOptions,
    ) {
        super(options);
    }

    apply(): Observable<void> {
        return this.templates.getTemplateDetails(this.baseOptions.templateName).pipe(
            map(template => {
                this.#createProjectFolder();
                this.#createDirectoryContents(
                    this.currDir,
                    template.path,
                    this.baseOptions.itemName,
                );
            }),
        );
    }

    #createProjectFolder(): boolean {
        const projectPath = this.path.join(this.currDir, this.baseOptions.itemName);

        if (this.fs.existsSync(projectPath)) {
            const msg = `Folder ${projectPath} exists. Delete or use another name.`;
            throw new Error(msg);
        }
        this.fs.mkdirSync(projectPath);

        return true;
    }

    #createDirectoryContents(currDir: string, templatePath: string, projectName: string) {
        // read all files/folders (1 level) from template folder
        const filesToCreate = this.fs.readdirSync(templatePath);
        // loop each file/folder
        filesToCreate.forEach(file => {
            const origFilePath = this.path.join(templatePath, file);

            // get stats about the current file
            const stats = this.fs.statSync(origFilePath);

            // skip files that should not be copied
            if (this.SKIP_FILES.indexOf(file) > -1) return;

            if (stats.isFile()) {
                // read file content and transform it using template engine
                const contents = render(this.fs.readFileSync(origFilePath), {
                    projectName,
                });
                // write file to destination folder
                const writePath = this.path.join(currDir, projectName, file);
                this.fs.writeFileSync(writePath, contents);
            } else if (stats.isDirectory()) {
                // create folder in destination folder
                this.fs.mkdirSync(this.path.join(currDir, projectName, file));
                // copy files/folder inside current folder recursively
                this.#createDirectoryContents(
                    currDir,
                    this.path.join(templatePath, file),
                    this.path.join(projectName, file),
                );
            }
        });
    }
}
