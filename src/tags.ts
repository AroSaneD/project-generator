export enum Tag {
    PROJECT,
    COMPONENT,
    ROUTABLE,
    RUSHABLE,
    // ? EXPORTABLE // Whether should add to local index.ts(x)
}

const tagsByTemplate = new Map<string, Tag[]>([
    ['sample-project', []],
    ['ts-project', [Tag.PROJECT, Tag.RUSHABLE]],
]);

export function getTagsByProject(templateName: string): Tag[] {
    const tags = tagsByTemplate.get(templateName);

    if (tags == null) {
        throw new Error(`Template '${templateName}' is not configured.`);
    }

    return tags;
}
