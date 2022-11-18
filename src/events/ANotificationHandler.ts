export abstract class ANotificationHandler<T> {
    abstract handle(notification: T): Promise<void>;
}
