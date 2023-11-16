import { HttpErrorResponse } from "@angular/common/http";
import { BanksCodesEnum } from "../models/banks-codes.enum";

export class APP_FUNCTIONS {

    public static getBankCardName(_text: string): string {
        let text = _text?.substring(0, 6);
        let bank_name: string;
        Object.values(BanksCodesEnum).forEach(_bankCode => {
            if (text?.includes(_bankCode.toString())) {
                bank_name = BanksCodesEnum[_bankCode];
            }
        });
        return bank_name;
    }

    public static handleError(_error: HttpErrorResponse, _callBack?: () => void) {
        _error.error.message ? alert(_error.error.message) : alert(_error.message);
        _callBack ? _callBack() : null;
    }

}