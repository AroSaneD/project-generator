import { Observable } from 'rxjs';
import { CliOptions } from './CliOptions';

export abstract class AModule {
    constructor(protected baseOptions: CliOptions) {}

    abstract shouldApply(): Observable<void>;
    abstract apply(): Observable<void>;
}
