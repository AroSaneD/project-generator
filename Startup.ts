#!/usr/bin/env node

import 'reflect-metadata';

import chalk from 'chalk';
import { catchError, of, lastValueFrom, concat, from, switchMap } from 'rxjs';
import { Container } from 'inversify';
import { CreateProjectModule } from './src/modules/CreateProject.module';
import { PathService } from './src/services/Path.service';
import { AModule } from './src/abstractions/AModule';
import { UserChoiceService } from './src/services/UserChoice.service';
import { CliOptions } from './src/abstractions/CliOptions';
import { getTagsByProject, Tag } from './src/Tags';

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
container
    .bind('options')
    .toDynamicValue(ctx => {
        const choice = ctx.container.get(UserChoiceService);

        return lastValueFrom(choice.selectTemplate());
    })
    .inSingletonScope();

container.bind<AModule[]>('modules').toDynamicValue(ctx => {
    const modulesObs = from(ctx.container.getAsync<CliOptions>('options')).pipe(
        switchMap(options => {
            const tags = getTagsByProject(options.templateName);
            const modules = tags
                .flatMap(tag => {
                    // Append as added
                    switch (tag) {
                        case Tag.PROJECT:
                            return [CreateProjectModule];
                        default:
                            return [];
                    }
                })
                .map(m => ctx.container.getAsync(m));

            return Promise.all(modules);
        }),
    );

    return lastValueFrom(modulesObs);
});

container.getAsync<AModule[]>('modules').then(modules => {
    // todo: get tags from project
    // todo: get modules for each tag
    const moduleApplies = modules.map(m => m.apply());
    const processObs = concat(...moduleApplies).pipe(
        catchError(err => {
            console.log(chalk.red(err));
            return of();
        }),
    );

    return lastValueFrom(processObs);
});

/* 
    Sneaking suspicion  the .NET way would be to trigger an event chain from one module to the next based on a predefined workflow
    Possible workflow would be:
        1. Select template 
        2. Execute builder based on template type (based on folder?)
            2.1 Any dynamic workflows should probably be exected from inside the external template creation module?
        3. Execute optional modules, e.g. monorepo inclusion
*/