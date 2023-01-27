import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'codePreviewSlicer'
})
export class CodePreviewSlicerPipe implements PipeTransform {

  transform(preview: string) {

    let ap:string[] = preview!.split('\n');
    let op:any[] = []
    for (const element of ap) {
      const l = element.trim();
      op.push({text:element,is_comment:l.startsWith('#')})
    }
    return op
  }

}
