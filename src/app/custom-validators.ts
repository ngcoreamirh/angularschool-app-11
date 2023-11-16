import { APP_FUNCTIONS } from "./common/app-functions";

export class customValidators {

    static mobileValidator(_number): any {
        if (_number.pristine) {
            return null;
        }

        // Iran Valid Mobile Phone Number
        const PHONE_REGEXP = /^(09([0-9]{9}))$/;

        _number.markAsDirty();

        if (PHONE_REGEXP.test(_number.value)) {
            return null;
        }

        return {
            mobileValidator: true
        };
    }

    static bankNotFound(_string): any {
        if (_string.pristine) {
            return null;
        }
        
        let value = APP_FUNCTIONS.getBankCardName(_string.value);
        
        if (value) {
            return null;
        }
        
        return {
            bankNotFound: true
        };
    }

}