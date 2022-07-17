# HtaccessMaker

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.6.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.




# installation process

the process to make this app

## installing bootstrap 

[add bootstrap in angular app](https://techincent.com/how-to-add-bootstrap-5-in-the-angular-application/)


## using electron with angular

[tutorial](https://pkief.medium.com/angular-desktop-apps-a9ce9e3574e8)

## install query builder and  local database

### knex 

npm i knex

### sqlite3

npm i sqlite3  
add this line i nscript section of package .json
`"rebuild": "electron-rebuild -f -w sqlite3",`
### electron-rebuild

npm i electron-rebuild

## rebuild sqlite3
need to install all dependency for `sqlite3`, like `Visual studio`, `python 2.7` etc
if not run:
``` bash 
npm install -g windows-build-tools
```  
it will install all dependency for in windows.

then build sqlite3 with electron-rebuild.
``` bash 
npm run rebuild
```  
This will rebuild electron with sqlite


## database creation
If the ./data/database.db file does not exist, run: 
```bash 
npm run create-database
```  
*/!\ to do only once /!\\*  
This will create the database and populate it with basic commands
