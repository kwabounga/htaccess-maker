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


----

# installation process

the process to make this app

## installing bootstrap 
`npm i bootstrap`  
+ follow this:  
[add bootstrap in angular app](https://techincent.com/how-to-add-bootstrap-5-in-the-angular-application/)


## using electron with angular
+ follow this:  
[tutorial](https://pkief.medium.com/angular-desktop-apps-a9ce9e3574e8)   

---
## DB part
### knex 

`npm i knex`


### sqlite3

`npm i sqlite3 `  

### electron-rebuild

`npm i electron-rebuild `  
add this line in script section of package .json  
```json
"scripts"{
  [...]
  "rebuild": "electron-rebuild -f -w sqlite3",
  [...]
}
```
### rebuild sqlite3
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
 

### database creation
If the `./data/database.db` file does not exist, run: 
```bash 
npm run create-database
```  
**/!\ to do only once /!\\**  
This will create the database and populate it with basic rules  
see:  `src\electron\build_db.js`


----
## communication between front and back
### using ipcEvent / ipcMain  from electron
...  for the electron part  
set on CreateWindows Method : 
```js 
win = new BrowserWindow({
    [...]
    webPreferences: { nodeIntegration: true, enableRemoteModule: true, contextIsolation: false }, // Must be set !! or electronSrv.ipcRenderer will always null
    ipcRenderer: ipcRenderer, // send ipcRenderer to the front
    isElectron: true,
    [...]
});
```
#### for get event from the Angular app:  
```js
ipcMain.on("test", (_event,data)=>{console.log('test',data)}); // listen for 'test' event from the frontend
```
### using ipcRenderer / ipcMain  from ngx-electron
... for angular part !
`npm i ngx-electron` 

--- 
**/!\\**   must comment the line :  **/!\\** 
```ts
(17) // readonly remote: Electron.Remote;
```
to resolve a f****g bug   
in `node_modules\ngx-electron\lib\electron.service.d.ts`  

---

in the app.module.ts:  

```js
import { NgxElectronModule } from 'ngx-electron';
```
[ngx-electron](https://www.npmjs.com/package/ngx-electron)

```js
@NgModule({
  [...]
  imports: [
    [...]
    NgxSmoothDnDModule, // <- import here
    [...]
  ],
  [...]
})
```
in the component.ts
```js
if(this.electronSrv.isElectronApp){ // check if is in electron app
  this.electronSrv.ipcRenderer.send('test',{test:'yooo'}); // send to backend
}
```

---
## cool drag and drop 


`npm i ngx-smooth-dnd`  
[ngx-smooth-dnd](https://github.com/kutlugsahin/ngx-smooth-dnd)  
[demo](https://kutlugsahin.github.io/ngx-smooth-dnd/)  
