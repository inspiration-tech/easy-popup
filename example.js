$(document).ready(function(){

    // создание локальной переменной myPopup, доступной в данном скрипте внутри $(document).ready()
    // если не нужно передавать параметры в объект попапа, можно его тут не создавать, а использовать базовый объект popup
    var myPopup = new Popup({
        speed: 210,
        closeOnBackgroundClick: false, // не будет закрывать попап при клике на фон
        closeOnEsc: false, // не будет закрывать попап при нажатии Esc
        confirmOnEnter: false, // не будет вызывать callback кнопки подтверждения при нажатии Enter
        templates: {
            confirm: false, // попап-шаблон с именем 'confirm' (data-name="confirm") будет удален из списка по умолчанию
            additional1: '<div class="popup" data-name="additional1"> \
                            <div class="closer"> \
                                <div></div> \
                                <div></div> \
                            </div> \
                            <div class="heading"></div> \
                            <div class="body"> \
                                <div class="text"></div> \
                                <div class="button_wrapper"> \
                                    <button class="closing_button" id="close_btn">Закрыть</button> \
                                </div> \
                            </div> \
                          </div>',
            additional2: '<div class="popup" data-name="additional2"> \
                            <div class="closer"> \
                                <div></div> \
                                <div></div> \
                            </div> \
                            <div class="heading"></div> \
                            <div class="body"> \
                                <div class="text"></div> \
                                <div>ещё какой-нибудь неизменяемый текст</div> \
                                <div class="button_wrapper"> \
                                    <button class="closing_button" id="close_btn">Закрыть</button> \
                                </div> \
                            </div> \
                          </div>'
        },
        styles: {
            '.tint .popup': {
                background: '#f00',
                textAlign: 'center',
                overflowX: 'hidden',
                margin: false // удалит свойство margin из дефолтных стилей, если оно там есть
            }, // Перезапишет свойства background, text-align и overflow-x селектора .tint .popup', если они есть. Если их нет - добавит. Если свойство имеет значение false, то оно удаляется из дефолтных стилей.
            '.tint': false, // удалит селектор .tint из дефолтных стилей (подобным образом удаляется любой селектор со значением false)
            '.popup .my-selector': {
                display: 'inline-block',
                margin: '20px 0'
            } // добавит дополнительный селектор '.popup .my-selector' в таблицу стилей (т.к. его ещё не было)
            },
        mediaStyles: {
            '@media screen and (max-width: 990px)': {
                '.tint .popup button, .popup input[type="submit"]': {
                    background: '#f00' // задаёт красный стиль для кнопок попапа при разрешении меньше 990px
                }
            }
        }
    });

    // при клике на элемент с классом my-class показываем попап
    $('.my-class').on('click',function(){
        myPopup.show({
            title: 'Внимание!',
            text: 'Вы кликнули на элемент с классом <span style="color: #f00;">"my-class"</span>.'
        });
    });

    // при клике на элемент с классом my-class2 показываем другой попап и ставим callback
    $('.my-class2').on('click',function(){
        myPopup.show({
            name: 'confirm',
            title: 'Внимание!',
            text: 'Вы только что кликнули на элементс с классом <span style="color: #008000;">"my-class"</span>. Подтвердите действие.',
            closingBtnCallback: function(){
                // callback, который вызывается при нажатии на .closing_button
                // пишем в консоль метку и закрываем попап
                console.log('closing_btn');
                myPopup.close();
            },
            confirmBtnCallback: function(){
                // callback, который вызывается при нажатии на .confirm_button
                // пишем в консоль другую метку и закрываем попап
                console.log('confirm_btn');
                myPopup.close();
            },
            closerCallback: function(){
                // callback, который вызывается при нажатии на .closer (крестик)
                // так же как и выше, пишем в консоль свою метку
                console.log('closer clicked');
                // а уже на закрытие попапа вешаем свой callback, при этом после его выполнения - блокируем дальнейшее выполнение скрипта (т.е. попап не закрывается) вторым параметром true. Если его не передавать, то попап после коллбека закроется.
                myPopup.close(function(){
                    console.log('special closer callback');
                }, true);
            }
        });
    });


});