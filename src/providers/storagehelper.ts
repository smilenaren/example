import { Injectable } from '@angular/core';

@Injectable()
export class Storagehelper {

    constructor() {
        console.log( 'Hello Storagehelper Provider' );
    }

    getStorageItem( key: string ) {
        const data =  window.localStorage[key];

        if ( this.isJson( data ) === true ) {
            return JSON.parse(data);
        } else {
            return data;
        }
    }

    deleteStorageItem(key: string) {
        return window.localStorage.removeItem(key);
    }


    setStorageItem( key: string, data: any ) {
        // tslint:disable-next-line: ban-types
        return new Promise<String>( ( resolve, reject ) => {
            let dta: any;

            if ( typeof data === 'object' ) {
                dta = JSON.stringify( data );
            } else {
                dta = data;
            }

            window.localStorage[key] = dta;
        });
    }

    isJson(str) {
        try {
            JSON.parse( str );
        } catch ( e ) {
           return false;
        }

        return true;
    }
}
