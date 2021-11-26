#!/usr/bin/env node

import * as fs from 'fs';
import * as path from 'path';
import * as inquirer from 'inquirer';
import chalk from 'chalk';
// import { createProject } from './src/utils/create-project';
import { CliOptions } from './src/abstractions/cli-options';
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
        currDir: __dirname,
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
    if (!createProject(tartgetPath)) {
        return;
    }

    createDirectoryContents(CURR_DIR, templatePath, projectName);
});
