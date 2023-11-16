import { Directive, EventEmitter, HostListener, Output } from '@angular/core';
import { APP_FUNCTIONS } from '../common/app-functions';

@Directive({
  selector: '[cardNumber]'
})
export class CardNumberMaskDirective {

  @Output() bankName = new EventEmitter<string>();

  constructor() { }

  @HostListener('input', ['$event'])
  changeValueAndMask(_event): any {
    let value = _event.target?.value;
    let bank_name = APP_FUNCTIONS.getBankCardName(value);
    bank_name ? this.bankName.emit(bank_name) : this.bankName.emit("");
  }

}