//import '@babel/polyfill'; // установить и импортировать, если что-то не работает в эксплорере
import {EasyPopup} from '../src/easy-popup_module';

window.onload = function(){
    window.popup = new EasyPopup({
        // params go here
    });

    document.querySelector('button').addEventListener('click', function(){
        popup.show();
    });
};