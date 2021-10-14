import * as fs from "fs";
import * as path from "path";
import { render } from "./utils/template";

const SKIP_FILES = ["node_modules", ".template.json"];

export function createDirectoryContents(
    currDir: string,
    templatePath: string,
    projectName: string
) {
    // read all files/folders (1 level) from template folder
    const filesToCreate = fs.readdirSync(templatePath);
    // loop each file/folder
    filesToCreate.forEach((file) => {
        const origFilePath = path.join(templatePath, file);

        // get stats about the current file
        const stats = fs.statSync(origFilePath);

        // skip files that should not be copied
        if (SKIP_FILES.indexOf(file) > -1) return;

        if (stats.isFile()) {
            // read file content and transform it using template engine
            const contents = render(fs.readFileSync(origFilePath, "utf8"), {
                projectName,
            });
            // write file to destination folder
            const writePath = path.join(currDir, projectName, file);
            fs.writeFileSync(writePath, contents, "utf8");
        } else if (stats.isDirectory()) {
            // create folder in destination folder
            fs.mkdirSync(path.join(currDir, projectName, file));
            // copy files/folder inside current folder recursively
            createDirectoryContents(
                currDir,
                path.join(templatePath, file),
                path.join(projectName, file)
            );
        }
    });
}
