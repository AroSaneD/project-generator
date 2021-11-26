export enum Tag {
    PROJECT,
    COMPONENT,
    ROUTABLE,
    
}

const tagsByTemplate = new Map<string, Tag[]>([
    ['sample-project', []],
    ['ts-project', [Tag.PROJECT]],
]);

export function getTagsByProject(templateName: string): Tag[] {
    const tags = tagsByTemplate.get(templateName);

    if (tags == null) {
        throw new Error(`Template '${templateName}' is not configured.`);
    }

    return tags;
}
