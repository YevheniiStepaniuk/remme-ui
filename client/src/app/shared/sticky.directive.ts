import { Directive } from '@angular/core';
import { HostBinding } from '@angular/core';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective {
  @HostBinding('style.position') postion = 'fixed';
  @HostBinding('style.bottom.px') bottom = 40;
  @HostBinding('style.right.px') right = 20;
}
