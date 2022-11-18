export abstract class AModule {
    abstract shouldApply(): Promise<boolean>;
    abstract apply(): Promise<void>;
}
