# Project Generator

Utility to automate creation of projects I typically use for rapid prototyping.

## Usage
Recommended approach is to install this repo globally, then use `arsd-generate-project.cmd` (arsd *tab* should auto complete it) at the location where you wish to create the project. 
(A new folder will be created at the location of calling the script)

Example use case would be:

```arsd-generate-project```

And follow the on screen questions/instructions.

## Todos:
* Add ability to run commands as part of project creation
  * Run git init as part of all project creation
* Automatically populate readme with list from templates folder?
* Add ability to describe secondary steps to templates (e.g. ask whether to add routing in react apps)
* Move templates folder outside of src
* Try enforing .cmd extension through shebang
