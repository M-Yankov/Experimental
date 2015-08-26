/*globals console*/
var cookies = (function(){
    "use strict";
    function readCookie(key) {
        var allCookies = document.cookie.split(';'),
            lenOfAllCookies = allCookies.length,
            currentCookie,
            keyAndValue,
            i,
            j;
        // "key1 = value1; key2 = value2; key3 = value3"
        for ( i = 0 ; i < lenOfAllCookies; i += 1) {
            currentCookie = allCookies[i]; // key1=value1
            for (j = 0; j < currentCookie.length; j += 1) {
                keyAndValue = currentCookie.split('=');
                if (keyAndValue[0] === key) {
                	return keyAndValue[1];
                }
            }
        }

        return 'Value not found!';
    }

    function createCookie(key, value, durationMinutes) {
        if (!(key && value) || isNaN(durationMinutes)) {
        	throw new Error('Invalid Parameters');
        }
        var date = new Date(),
            dateMinutes = date.getMinutes();
        date.setMinutes(dateMinutes +  durationMinutes);
        var cookierStr =  key + '=' + value + '; expires=' + date + '; path=/';
        console.log(cookierStr);
        document.cookie =cookierStr;
    }

    function removeCookie(key) {
        createCookie(key, '', -1);
    }

    return {
        createCookie : createCookie,
        readCookie : readCookie,
        removeCookie : removeCookie
    };
}());