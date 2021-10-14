#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var inquirer = __importStar(require("inquirer"));
var create_project_1 = require("./create-project");
var create_directory_contents_1 = require("./create-directory-contents");
var CHOICES = fs.readdirSync(path.join(__dirname, "templates"));
var QUESTIONS = [
    {
        name: "template",
        type: "list",
        message: "What project template would you like to use?",
        choices: CHOICES,
    },
    {
        name: "name",
        type: "input",
        message: "New project name?",
    },
];
// inquirer.prompt(QUESTIONS).then((answers) => {
//     console.log(answers);
// });
var CURR_DIR = process.cwd();
inquirer.prompt(QUESTIONS).then(function (answers) {
    var projectChoice = answers["template"];
    var projectName = answers["name"];
    var templatePath = path.join(__dirname, "templates", projectChoice);
    var tartgetPath = path.join(CURR_DIR, projectName);
    var options = {
        projectName: projectName,
        templateName: projectChoice,
        templatePath: templatePath,
        tartgetPath: tartgetPath,
    };
    console.log(options);
    if (!create_project_1.createProject(tartgetPath)) {
        return;
    }
    create_directory_contents_1.createDirectoryContents(CURR_DIR, templatePath, projectName);
});
//# sourceMappingURL=index.js.map