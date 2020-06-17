//import '@babel/polyfill'; // установить и импортировать, если что-то не работает в эксплорере
import {EasyPopup} from '../src/easy-popup_module';

let isTouch = function () {
    // true if touch / false if not
    return ('ontouchstart' in window) || ('onmsgesturechange' in window);
};

let iosDetection = function() {
    // true if ios / false if not
    return ((navigator.platform.indexOf('iPad') !== -1)||(navigator.platform.indexOf('iPhone') !== -1));
};

window.onload = function(){
    // popup example working on iOS
    window.popupIOS = new EasyPopup({
        noScrollTop: isTouch() && !iosDetection(), // for all touch devices except iOS
        hideOnIos: '.page-wrapper'

        // other params, if necessary
    });

    document.querySelector('button').addEventListener('click', function(){
        popupIOS.show(); // P.S. for iOS devices other styling will be used, as indicated in the params (to avoid positioning bugs)
    });
};