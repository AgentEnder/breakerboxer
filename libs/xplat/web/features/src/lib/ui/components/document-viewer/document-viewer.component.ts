import { Component, Input, OnInit, ɵSafeResourceUrl } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'tbs-document-viewer',
  template: ` <iframe [src]="_src" frameborder="0"> </iframe>`,
  styles: [
    `
      iframe {
        width: 100%;
        height: 100%;
      }
      :host {
        display: block;
      }
    `,
  ],
})
export class DocumentViewerComponent implements OnInit {
  _src: ɵSafeResourceUrl;
  _documentUrl: string;
  @Input() set documentUrl(v: string) {
    this._documentUrl = v;
    this._src = this.sanitizer.bypassSecurityTrustResourceUrl(
      `https://docs.google.com/gview?url=${v}&embedded=true`
    );
  }

  get documentUrl(): string {
    return this._documentUrl;
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {}
}
