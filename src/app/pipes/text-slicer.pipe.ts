import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'textSlicer'
})
export class TextSlicerPipe implements PipeTransform {

  transform(txt:string, length:number = 20): string {
    return txt.slice(0, length);
  }

}
