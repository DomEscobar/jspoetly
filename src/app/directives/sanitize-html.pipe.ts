import { Pipe, PipeTransform, } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, SafeUrl } from '@angular/platform-browser';

@Pipe({
  name: 'sanitizeHtml'
})
export class SanitizeHtmlPipe implements PipeTransform
{

  constructor(private _sanitizer: DomSanitizer)
  {
  }

  transform(v: string)
  {
    return this._sanitizer.bypassSecurityTrustHtml(v);
  }
}
