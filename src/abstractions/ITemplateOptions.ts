export interface ITemplateOptions {
    isStatic: boolean;
    command?: string;
}

// Static template workflow
//      select template -> select name -> maybe additional configs

// Dynamic template workflow
//      select template -> call command (will take name there)
//      any modifications will need to now be aware of what was created in the previous step
//      cases like vite and svelekit also generate entirely different structures based on selection
//      and we might still want to change imports for vite. e.g. it generates only apps, but we want a lib

// ? Any scanning code for what was generated should be contained in the template's # folder?
// ! Writing a ts file there would cause problem for how this package gets executed (either ts or js...)