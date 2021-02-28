import { Directive, HostBinding, Input, SimpleChanges } from '@angular/core';

@Directive({
  selector: 'a[href]',
})
export class ExternalLinkDirective {
  @HostBinding('rel')
  rel = '';

  @HostBinding('target')
  target = '_self';

  @Input()
  @HostBinding('href')
  href?: string;

  ngOnChanges(changes: SimpleChanges) {
    if (changes.href) {
      const isExternal = this.isLinkExternal();
      this.rel = isExternal ? 'noopener' : '';
      this.target = isExternal ? '_blank' : '_self';
    }
  }

  /**
   * Check if link is external or not
   */
  private isLinkExternal() {
    return !(this.href || '').includes(location.hostname);
  }
}
