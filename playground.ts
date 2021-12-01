import * as fs from 'fs';
import * as path from 'path';
import { parse, createScanner, modify, JSONPath, applyEdits } from 'jsonc-parser';

const filePath = path.join(__dirname, 'templates', 'ts-project', '_gen-files', 'gen.json');
const fileContent = fs.readFileSync(filePath, 'utf-8');
// const parsed = parse(fileContent, undefined, {
//     allowEmptyContent: true,
//     allowTrailingComma: true,
//     disallowComments: false,
// });
const parsed = createScanner(fileContent);
const token = parsed.getToken();
const edits = modify(
    fileContent,
    ['e'],
    {
        a: 'test',
        b: 'test2',
    },
    {
        getInsertionIndex: properties => {
            return properties.length;
        },
        isArrayInsertion: true,
    },
);
const result = applyEdits(fileContent, edits);
fs.writeFileSync(filePath, result, 'utf-8');

console.log(edits);
