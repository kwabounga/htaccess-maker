import { Pipe, PipeTransform  } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'byPassSecurity'
})
export class SanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer){}

  transform(value: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(value);
  }

}
