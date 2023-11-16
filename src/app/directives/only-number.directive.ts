import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[onlyNumber]'
})
export class OnlyNumberDirective {

  constructor(private _elemRef: ElementRef, private _renderer: Renderer2) {
    this._renderer.setStyle(this._elemRef.nativeElement, 'letter-spacing', "6px");
  }
  
  @HostListener('input', ['$event'])
  changeValue(_event) {
    this._renderer.setProperty(this._elemRef.nativeElement, 'value', _event.target?.value.replace(/[^0-9]/gi, ''));
  }

}
