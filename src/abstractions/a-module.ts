import { Observable } from 'rxjs';
import { CliOptions } from './cli-options';

export abstract class AModule {
    constructor(protected baseOptions: CliOptions) {}

    abstract apply(): Observable<void>;
}
