import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
/**
 * A custom Files Service  
 */
export class FilesStuffService {

  constructor() { }

  /**
   * create a file and force the navigator to send it to the user
   * using blob to build  the file
   * and <anchor> to force download
   * @param {string} fileName 
   * @param {any} data 
   */
  exportFile(fileName:string,data:any){
    let blob = new Blob([data], { type: 'application/x-extension-htaccess' });
    let url= window.URL.createObjectURL(blob);
    let a = document.createElement('a');
    document.body.appendChild(a);
    a.setAttribute('style', 'display: none');
    a.href = url;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(url);
    a.remove();
  }
}