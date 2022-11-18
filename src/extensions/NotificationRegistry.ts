import { Container } from 'inversify';
import { ABaseNotification } from '../events/ABaseNotification';
import { ANotificationHandler } from '../events/ANotificationHandler';

export function registerNotificationHandler<T extends ABaseNotification>(
    container: Container,
    eventType: new (...args: any[]) => T,
    eventHandler: new (...args: any[]) => ANotificationHandler<T>,
) {
    container.bind(eventType).to(eventHandler).inTransientScope();
}
