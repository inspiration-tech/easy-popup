//import '@babel/polyfill'; // установить и импортировать, если что-то не работает в эксплорере
import {SimplePopup} from '../src/simple-popup_module';

window.onload = function(){
    window.popup = new SimplePopup({
        // params go here
    });

    document.querySelector('button').addEventListener('click', function(){
        popup.show();
    });
};