#!/usr/bin/env node

import 'reflect-metadata';

import chalk from 'chalk';
import { catchError, of, lastValueFrom, concat } from 'rxjs';
import { Container } from 'inversify';
import { CreateProjectModule } from './src/modules/create-project.module';
import { PathService } from './src/services/path.service';
import { AModule } from './src/abstractions/a-module';
import { UserChoiceService } from './src/services/user-choice.service';

// ? extendable templates
// todo: add environment checking
//      todo: rush integration
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

container.getAsync(CreateProjectModule).then(cpm => {
    // todo: get tags from project
    // todo: get modules for each tag
    const modules: AModule[] = [cpm];
    const moduleApplies = modules.map(m => m.apply());
    const processObs = concat(...moduleApplies).pipe(
        catchError(err => {
            console.log(chalk.red(err));
            return of();
        }),
    );

    return lastValueFrom(processObs);
});
