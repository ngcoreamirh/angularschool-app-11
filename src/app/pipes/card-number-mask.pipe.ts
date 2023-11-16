import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cardNumberMask'
})
export class CardNumberMaskPipe implements PipeTransform {

  transform(_value: string, ...args: unknown[]): unknown {
    return _value ? this._textToBankCardNumberMask(_value) : null;
  }

  private _textToBankCardNumberMask(_text: string): string {
    return _text?.replace(/(\d{4}(?!\s))/g, "$1   ").trim();
  }

}
