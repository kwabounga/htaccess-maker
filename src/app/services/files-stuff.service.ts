import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilesStuffService {

  constructor() { }

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