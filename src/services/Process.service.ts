import { injectable } from 'inversify';
import { execSync } from 'child_process';

@injectable()
export class ProcessService {
    public execute(command: string) {
        execSync(command);
    }
}
