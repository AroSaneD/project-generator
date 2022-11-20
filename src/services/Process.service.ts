import { injectable } from 'inversify';
import { spawn } from 'child_process';

@injectable()
export class ProcessService {
    public async execute(command: string) {
        return new Promise<void>(res => {
            const [first, ...rest] = command.split(' ');
            const shell = spawn(first, rest, { stdio: 'inherit' });
            shell.on('close', res);
        });
    }
}
