import { z } from 'zod';

const AppSettingsSchema = z.object({
    SkipableTemplateFiles: z.array(z.string()),
});

type AppSettingsType = z.infer<typeof AppSettingsSchema>;

export abstract class AppSettings implements AppSettingsType {
    abstract SkipableTemplateFiles: AppSettingsType['SkipableTemplateFiles'];

    public static parse(s: unknown) {
        return AppSettingsSchema.parse(s);
    }
}
