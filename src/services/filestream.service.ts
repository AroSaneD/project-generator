import { injectable } from 'inversify';
import * as fs from 'fs';

@injectable()
export class FileStreamService {
    writeFileSync(writePath: string, contents: string) {
        return fs.writeFileSync(writePath, contents, 'utf-8');
    }

    readFileSync(origFilePath: string): string {
        return fs.readFileSync(origFilePath, 'utf-8');
    }

    statSync(origFilePath: string) {
        return fs.statSync(origFilePath);
    }

    readdirSync(templatePath: string) {
        return fs.readdirSync(templatePath);
    }

    mkdirSync(projectPath: string) {
        return fs.mkdirSync(projectPath);
    }

    existsSync(projectPath: string) {
        return fs.existsSync(projectPath);
    }
}
