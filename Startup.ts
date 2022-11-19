#!/usr/bin/env node

import 'reflect-metadata';

// import chalk from 'chalk';
import { Container } from 'inversify';
import { CreateProjectModule } from './src/modules/CreateProject.module';
import { PathService } from './src/services/Path.service';
import { registerNotificationHandler } from './src/extensions/NotificationRegistry';
import { UserInputNotification } from './src/events/UserInputNotification';
import { UserInputModule } from './src/modules/UserInput.module';
import { NotificationService } from './src/services/Notification.service';
import { ANotificationHandler } from './src/events/ANotificationHandler';
import { ABaseNotification } from './src/events/ABaseNotification';
import { StaticTemplateNotification } from './src/events/StaticTemplateNotification';
import { TemplateConfigurationHandler } from './src/modules/TemplateConfiguration.module';

// ? extendable templates
// todo: add environment checking
//      todo: turbo integration
//      todo: .NET-like options. Probably a generic class, that is configured during bind
//      ? routes?
//      ? should it be per template?

const CURR_DIR = process.cwd();
const container = new Container({
    autoBindInjectable: true,
    skipBaseClassChecks: true,
});

container
    .bind('templatesPath')
    .toDynamicValue(ctx => {
        const path = ctx.container.get(PathService);
        return path.join(__dirname, 'templates');
    })
    .inSingletonScope();

container
    .bind('currDir')
    .toDynamicValue(() => CURR_DIR)
    .inSingletonScope();

// ? Unsure how this will affect tag-dynamic injection
// container.bind('tags').toDynamicValue(async ctx => {
//     const options = await ctx.container.getAsync<CliOptions>('options');
//     const tags = getTagsByProject(options.templateName);

//     return tags;
// });

// todo: error handling
container.bind(UserInputModule).toSelf();
container.bind(NotificationService).toSelf().inSingletonScope();
registerNotificationHandler(container, UserInputNotification, TemplateConfigurationHandler);
registerNotificationHandler(container, StaticTemplateNotification, CreateProjectModule);

container.getAsync(NotificationService).then(s => {
    s.events.subscribe(async n => {
        const handler = await container.getAsync<ANotificationHandler<ABaseNotification>>(
            n.constructor,
        );
        handler.handle(n);
    });
});

container.getAsync(UserInputModule).then(m => {
    m.takeInput();
});

// * Still need need to handle extra settings on top of project creation
// ? Add pre-creation handlers to gather desired settings
// ? decoration? :)

// * technically, it still might be possible to add injectable info to the scope at runtime, might be messy
// * Might be better idea to hold off on this until custom DI implementation available
