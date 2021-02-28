import { Pipe, PipeTransform } from '@angular/core';
import * as marked from 'marked';

@Pipe({
  name: 'marked',
})
export class MarkedPipe implements PipeTransform {
  renderer: any;

  constructor() {
    this.renderer = new marked.Renderer();
    const linkRenderer = this.renderer.link;
    this.renderer.link = (href, title, text) => {
      const localLink = href.startsWith(`${location.protocol}//${location.hostname}`);
      const html: string = linkRenderer.call(this.renderer, href, title, text);
      const link = localLink
        ? html
        : html.replace(/^<a /, `<a target="_blank" rel="noreferrer noopener nofollow" `);
      return link;
    };
  }

  transform(value: any): any {
    if (value && value.length > 0) {
      value = marked(value, { renderer: this.renderer });
    }
    return value;
  }
}
