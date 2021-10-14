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
exports.createDirectoryContents = void 0;
var fs = __importStar(require("fs"));
var path = __importStar(require("path"));
var template_1 = require("./utils/template");
var SKIP_FILES = ["node_modules", ".template.json"];
function createDirectoryContents(currDir, templatePath, projectName) {
    // read all files/folders (1 level) from template folder
    var filesToCreate = fs.readdirSync(templatePath);
    // loop each file/folder
    filesToCreate.forEach(function (file) {
        var origFilePath = path.join(templatePath, file);
        // get stats about the current file
        var stats = fs.statSync(origFilePath);
        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1)
            return;
        if (stats.isFile()) {
            // read file content and transform it using template engine
            var contents = template_1.render(fs.readFileSync(origFilePath, "utf8"), {
                projectName: projectName,
            });
            // write file to destination folder
            var writePath = path.join(currDir, projectName, file);
            fs.writeFileSync(writePath, contents, "utf8");
        }
        else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(currDir, projectName, file));
            // copy files/folder inside current folder recursively
            createDirectoryContents(currDir, path.join(templatePath, file), path.join(projectName, file));
        }
    });
}
exports.createDirectoryContents = createDirectoryContents;
//# sourceMappingURL=create-directory-contents.js.map