#!/usr/bin/env node

import 'reflect-metadata';

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
// import { createProject } from './src/utils/create-project';
import { CliOptions } from './src/abstractions/cli-options';
import { CreateProjectModule } from './src/modules/create-project.module';
import { PathService } from './src/services/path.service';
import { FileStreamService } from './src/services/filestream.service';
import { catchError, of, lastValueFrom, concat } from 'rxjs';
import { AModule } from './src/abstractions/a-module';
// import { createDirectoryContents } from './src/create-directory-contents';

const CHOICES = fs.readdirSync(path.join(__dirname, 'templates'));
const QUESTIONS = [
    {
        name: 'template',
        type: 'list',
        message: 'What project template would you like to use?',
        choices: CHOICES,
    },
    {
        name: 'name',
        type: 'input',
        message: 'New project name?',
    },
];

// inquirer.prompt(QUESTIONS).then((answers) => {
//     console.log(answers);
// });
const CURR_DIR = process.cwd();
inquirer.prompt(QUESTIONS).then((answers) => {
    const projectChoice = answers['template'];
    const projectName = answers['name'];
    const templatePath = path.join(__dirname, 'templates', projectChoice);
    const tartgetPath = path.join(CURR_DIR, projectName);
    const options: CliOptions = {
        currDir: CURR_DIR,
        itemName: projectName,
        templateName: projectChoice,
        templatePath,
        itemPath: tartgetPath,
    };
    console.log(options);

    // ? extendable templates
    // todo: add environment checking
    //      todo: rush integration
    //      ? routes?
    //      ? should it be per template?

    const createProject = new CreateProjectModule(
        new PathService(),
        new FileStreamService(),
        options
    );
    // todo: get tags from projeect
    // todo: get modules for each tag
    // ! DO NOT TRY TO MAKE A DYNAMIC FACTORY THAT INJECTS TAGS

    const modules: AModule[] = [createProject];
    const moduleApplies = modules.map((m) => m.apply());
    const processObs = concat(...moduleApplies).pipe(
        catchError((err, err$) => {
            console.log(chalk.red(err));
            return of();
        })
    );

    return lastValueFrom(processObs);
});
