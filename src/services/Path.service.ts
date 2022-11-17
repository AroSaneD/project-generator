import { injectable } from 'inversify';
import * as path from 'path';

@injectable()
export class PathService {
    join(...args: string[]) {
        return path.join(...args);
    }
}
