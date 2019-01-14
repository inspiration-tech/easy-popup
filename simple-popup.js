// https://github.com/inspiration-tech/simple-popup

window.Popup = function() {
    var defaults = {
            speed: 150,
            styles: false,
            replaceStyles: false,
            mediaStyles: false,
            templates: true,
            closeOnBackgroundClick: true,
            closeOnEsc: true,
            confirmOnEnter: true,
            scrollTop: null
        },
        Popup = this,
        params = arguments.length ? arguments[0] : {},
        titleHashBase = '958c1d72380718e5f4b576299fb5ea0c',
        StyleSheet,
        specialHashInit = false,
        styleHandler = {
            objToCSS: function(obj) {
                var html = '';
                for (var prop in obj) {
                    if (!obj.hasOwnProperty(prop))
                        continue;

                    html += prop.replace(/[A-Z]/g, function(match) {return '-' + match.toLowerCase()})+':'+(obj[prop] !== '' ? obj[prop] : '""')+';';
                }
                return html;
            },
            processObj: function(scriptStyleObj, paramStyleObj){
                for (var customSelector in paramStyleObj) {
                    if (!paramStyleObj.hasOwnProperty(customSelector))
                        continue;

                    customSelector = customSelector.trim().replace(/\s+/g, ' ');

                    if (paramStyleObj[customSelector] === false) {
                        delete scriptStyleObj[customSelector];
                        continue;
                    }

                    if (!scriptStyleObj.hasOwnProperty(customSelector)) {
                        scriptStyleObj[customSelector] = paramStyleObj[customSelector];
                        continue;
                    }

                    scriptStyleObj[customSelector] = $.extend(scriptStyleObj[customSelector], paramStyleObj[customSelector]);

                    for (var customProperty in scriptStyleObj[customSelector]) {
                        if (!scriptStyleObj[customSelector].hasOwnProperty(customProperty))
                            continue;

                        if (scriptStyleObj[customSelector][customProperty] === false) {
                            delete scriptStyleObj[customSelector][customProperty];
                        }

                    }
                }

                return scriptStyleObj;
            }
        };

    for (var prop in defaults) {
        if (!defaults.hasOwnProperty(prop))
            continue;

        this[prop] = params.hasOwnProperty(prop) ? params[prop] : defaults[prop];
    }

    this.actionState = false;

    StyleSheet = $('style[title="'+titleHashBase+'"]');

    if (params.hasOwnProperty('styleSheetTitle') && params.styleSheetTitle === titleHashBase)
        specialHashInit = true;

    // если это не базовый автовызов - почистить таблицу стилей
    if (!specialHashInit && StyleSheet.length)
        StyleSheet.empty();


    var templates = {
        message: '<div class="popup" data-name="message"> \
                <div class="closer"> \
                    <div></div> \
                    <div></div> \
                </div> \
                <div class="heading"></div> \
                <div class="body"> \
                    <div class="text"></div> \
                    <div class="button_wrapper"> \
                        <button class="closing_button" id="close_btn">ОК</button> \
                    </div> \
                </div> \
            </div>',
        confirm: '<div class="popup" data-name="confirm"> \
                <div class="closer"> \
                    <div></div> \
                    <div></div> \
                </div> \
                <div class="heading"></div> \
                <div class="body"> \
                    <div class="text"></div> \
                    <div class="button_wrapper"> \
                        <button class="confirm_button">Принять</button> \
                        <button class="closing_button">Отклонить</button> \
                    </div> \
                </div> \
            </div>'
    };

    if (typeof params.templates === 'object') {
        for (var customTemplate in params.templates) {
            if (!params.templates.hasOwnProperty(customTemplate))
                continue;

            templates[customTemplate] = params.templates[customTemplate];
        }
    }

    $(document).ready(function(){
        if (!$('body>.tint').length)
            $('body').append('<div class="tint"></div>');

        var html = '';
        for (var name in templates) {
            if (!templates.hasOwnProperty(name))
                continue;

            if (templates[name] === false) {
                delete templates[name];
                var popupItem = $('body>.tint .popup[data-name="'+name+'"]');
                if (popupItem.length)
                    popupItem.remove();
                continue;
            }


            if (!$('body>.tint .popup[data-name="'+name+'"]').length)
                html += templates[name];
        }

        $('body>.tint').append(html);
        $('.popup').hide(); // по умолчанию у попапов display inline-block, поэтому нужно скрыть
    });



    if (this.styles && !(specialHashInit && StyleSheet.length)) {
        if (typeof this.styles !== 'object')
            this.styles = {};

        /*
        * ШАГ 1:
        * Объект scriptStyles содержит дефолтные стили для попапа, объект scriptMediaStyles - дефолтные медиазапросы. Объект this.styles дополняет объект scriptStyles (а объект this.mediaStyles дополняет объект scriptMediaStyles): если указанного селектора нет - он добавляется, если есть - то его объект CSS-стилей дополняется стилями из объекта this.styles (по соответствующему селектору), при этом если в значении одного из свойств указано false - данное свойство удаляется. Аналогичным образом, если в объекте this.styles передан селектор со значением false, то этот селектор удаляется из объекта scriptStyles.
        * */

        var scriptStyles = {
            'body>.tint': {
                position: 'fixed',
                display: 'none',
                width: '100%',
                height: '100vh !important',
                overflowY: 'auto',
                background: 'RGBA(0,0,0,0.7)',
                zIndex: 10000,
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                textAlign: 'center',
                verticalAlign: 'middle'
            },
            'body>.tint::after': {
                display: 'inline-block',
                height: '100%',
                content: '',
                verticalAlign: 'middle'
            },
            '.popup': {
                position: 'relative',
                display: 'inline-block',
                background: '#fff',
                width: 'calc(100% - 20px)',
                maxWidth: '550px',
                minHeight: '130px',
                margin: '50px 10px',
                borderRadius: '10px',
                verticalAlign: 'middle',
                overflow: 'hidden',
                boxShadow: '0 0 15px #fff'
            },
            '.popup .heading': {
                height: '43px',
                background: '#34991b',
                font: 'bold 30px/45px Arial',
                color: '#fff',
                textAlign: 'center',
                textTransform: 'uppercase',
                padding: '0 17px',
                margin: 'auto'
            },
            '.popup .body': {
                padding: '12px 17px 27px'
            },
            '.popup .closer': {
                position: 'absolute',
                width: '25px',
                height: '25px',
                right: '5px',
                top: '8px',
                cursor: 'pointer',
                transition: 'all 280ms'
            },
            '.popup .closer > div': {
                position: 'absolute',
                left: '11px',
                width: '3px',
                height: '25px',
                background: '#fff',
                borderRadius: '3px',
                transition: 'all 280ms'
            },
            '.popup .closer > div:nth-child(1)': {
                WebkitTransform: 'rotate(45deg)',
                transform: 'rotate(45deg)'
            },
            '.popup .closer > div:nth-child(2)': {
                WebkitTransform: 'rotate(-45deg)',
                transform: 'rotate(-45deg)'
            },
            '.popup .closer:hover': {
                transform: 'scale3d(1.3, 1.3, 0.2)'
            },
            '.popup .closer:hover > div': {
                background: '#9cd1d4'
            },
            '.popup button, .popup input[type="submit"]': {
                display: 'inline-block',
                margin: 'auto',
                background: '#34991b',
                borderRadius: '6px',
                font: 'bold 18px Tahoma',
                color: '#fff',
                height: '35px',
                padding: '0 35px',
                cursor: 'pointer',
                transition: 'all 250ms',
                border: 'none'
            },
            '.popup button:hover, .popup input[type="submit"]:hover': {
                opacity: 0.7
            },
            '.popup .body .closing_button': {
                marginTop: '10px'
            },
            '.popup .body .text': {
                marginBottom: '16px',
                textAlign: 'center'
            },
            '.popup .input_wrapper': {
                marginBottom: '10px'
            },
            '.popup .button_wrapper button': {
                display: 'inline-block',
                marginLeft: '10px',
                marginRight: '10px'
            },
            'body.h_overflow, html.h_overflow': {
                overflow: 'hidden !important',
                height: '100vh',
                width: '100%',
                position: 'fixed'
            }
        };

        var scriptMediaStyles = {};

        if (this.replaceStyles)
            scriptStyles = $.extend(scriptStyles, this.styles);
        else
            scriptStyles = styleHandler.processObj(scriptStyles, this.styles);

        if (this.mediaStyles !== false) {
            if (typeof this.mediaStyles !== 'object')
                this.mediaStyles = {};

            for (var mediaQuery in this.mediaStyles) {
                if (!this.mediaStyles.hasOwnProperty(mediaQuery))
                    continue;

                mediaQuery = mediaQuery.trim().replace(/\s+/g, ' ');

                if (this.mediaStyles[mediaQuery] === false) {
                    delete scriptMediaStyles[mediaQuery];
                    continue;
                }

                if (!scriptMediaStyles.hasOwnProperty(mediaQuery)) {
                    scriptMediaStyles[mediaQuery] = this.mediaStyles[mediaQuery];
                    continue;
                }

                if (this.replaceStyles)
                    scriptMediaStyles[mediaQuery] = $.extend(scriptMediaStyles[mediaQuery], this.mediaStyles[mediaQuery]);
                else
                    scriptMediaStyles[mediaQuery] = styleHandler.processObj(scriptMediaStyles[mediaQuery], this.mediaStyles[mediaQuery]);
            }
        }


        /*
        * ШАГ 2:
        * Если в DOM ещё не создана таблица стилей (тег style) данным скриптом, то она создаётся.
        * Берётся объект scriptStyles, и каждый его селектор с соответствующим объектом CSS-стилей преобразуются в необходимый формат и записываются в созданную таблицу стилей. То же самое делается для каждой строки медиазапроса в объекте scriptMediaStyles.
        * */

        if (!StyleSheet.length) {
            $('head').append('<style title="'+titleHashBase+'"></style>');
            StyleSheet = $('style[title="'+titleHashBase+'"]');
        }


        for (var selector in scriptStyles) {
            if (!scriptStyles.hasOwnProperty(selector))
                continue;

            selector = selector.trim().replace(/\s+/g, ' ');
            var selectorContent = styleHandler.objToCSS(scriptStyles[selector]);
            StyleSheet.append(selector + "{" + selectorContent + "}");
        }

        if (this.mediaStyles !== false) {
            for (var mediaString in scriptMediaStyles) {
                if (!scriptMediaStyles.hasOwnProperty(mediaString))
                    continue;

                var mediaHTML = '';
                for (var mediaSelector in scriptMediaStyles[mediaString]) {
                    if (!scriptMediaStyles[mediaString].hasOwnProperty(mediaSelector))
                        continue;

                    mediaSelector = mediaSelector.trim().replace(/\s+/g, ' ');

                    var mediaSelectorContent = styleHandler.objToCSS(scriptMediaStyles[mediaString][mediaSelector]);

                    mediaHTML += mediaSelector+"{"+mediaSelectorContent+"}";
                }
                StyleSheet.append(mediaString + "{" + mediaHTML + "}");
            }
        }


    }

    this.show = function() {
        // если какое-то действие ещё не отработало - сразу выходим
        if (this.actionState)
            return false;

        // если были активные элементы - запоминаем и делаем неактивными
        var elemsWithFocus = $(':focus');
        if (elemsWithFocus.length) {
            // сохраняем элемент, на которым был фокус глобально
            window.a3e95e180cc04c9d85ffdd8ebecef047 = elemsWithFocus.eq(0);
            elemsWithFocus.blur();
        }

        var showParams = {
                title: 'Ошибка', // заголовок попапа
                text: 'Произошла ошибка всплывающего окна. Пожалуйста, обратитесь в обратную связь.', // текст попапа
                btnEvents: true, // включить/отключить события при клике на кнопки .closing_button и .confirm_button
                name: 'message', // имя попапа, который вызывается (атрибут data-name)
                html: false, // применить HTML-шаблон, если он передан (игнорируя title, text и name)
                closerCallback: function(){},
                closingBtnCallback: false, // если на .closing_button нужно повесить отдельный callback - передать сюда
                confirmBtnCallback: function(){}, // если на .confirm_button нужно повесить отдельный callback - передать сюда
                backgroundClickCallback: false, // если при клике на body>.tint (фон) нужен отдельный callback - передать сюда
                callbackOnEsc: false, // если при нажатии Esc нужен отдельный callback - передать сюда
                callbackOnEnter: false, // если при нажатии Enter нужен отдельный callback - передать сюда,
                closingBtnText: false,
                confirmBtnText: false
            },
            arguments = arguments.length ? arguments[0] : {},
            elem;

        for (var prop in showParams) {
            if (!showParams.hasOwnProperty(prop))
                continue;

            if (arguments.hasOwnProperty(prop))
                showParams[prop] = arguments[prop];
        }

        var activePopup = $('.popup.active');
        if (activePopup.length){
            $('.popup').hide(this.speed).removeClass('active');

            setTimeout(function(){
                Popup.show(showParams);
            },this.speed);
            return false;
        }

        elem = $('body>.tint .popup[data-name="'+showParams.name+'"]');
        if (!elem.length)
            elem = $('body>.tint .popup[data-name="'+(showParams.name = 'message')+'"]');
        if (!elem.length)
            elem = $('body>.tint .popup:first-child');

        // вставка контента в попап
        if (showParams.title !== false)
            elem.children('.heading').html(showParams.title);
        if (showParams.html)
            elem.children('.body').html(showParams.html);
        else {
            if (showParams.text !== false)
                elem.children('.body').find('.text').html(showParams.text);
        }

        // текст кнопок
        if (showParams.closingBtnText !== false)
            elem.children('.body').find('.closing_button').html(showParams.closingBtnText);
        else {
            if (showParams.name === 'confirm')
                elem.children('.body').find('.closing_button').html('Отклонить');
            else if (showParams.name === 'message')
                elem.children('.body').find('.closing_button').html('ОК');
        }

        if (showParams.confirmBtnText !== false)
            elem.children('.body').find('.confirm_button').html(showParams.confirmBtnText);
        else {
            if (showParams.name === 'confirm')
                elem.children('.body').find('.confirm_button').html('Подтвердить');
        }

        // отображение попапа
        var tint = $('body>.tint');
        tint.show().addClass('active');
        this.scrollTop = $(document).scrollTop();
        $('body,html').addClass('h_overflow');
        $('body').scrollTop(this.scrollTop);
        if (!elem.hasClass('active')) {
            elem.addClass('active');
            elem.show(this.speed);
        }

        var closerCallbackMain = function(){
            if (typeof showParams.closerCallback !== 'object' || !showParams.closerCallback.hasOwnProperty('closerOff') || showParams.closerCallback.closerOff !== true) {
                if (Popup.actionState)
                    return false;
                // базовый callback, который происходит при нажатии на .closer
                Popup.close();
            }

            if (typeof showParams.closerCallback === 'function')
                showParams.closerCallback();
            else if (typeof showParams.closerCallback === 'object' && showParams.closerCallback.hasOwnProperty('callback') && typeof showParams.closerCallback.callback === 'function')
                showParams.closerCallback.callback();
        };

        // событие на клоузер - стереть и повесить новое, конкретно для вызванного попапа
        elem.children('.closer').off('click').on('click',closerCallbackMain);
        // если события на кнопки не отключены
        if (showParams.btnEvents) {
            var closingBtn = elem.find('.closing_button');
            if (closingBtn.length) {
                closingBtn.off('click').on('click',showParams.closingBtnCallback ? showParams.closingBtnCallback : closerCallbackMain);
            }
            var confirmBtn = elem.find('.confirm_button');
            if (confirmBtn.length) {
                confirmBtn.off('click').on('click',showParams.confirmBtnCallback ? showParams.confirmBtnCallback : closerCallbackMain);
            }
        }
        // если включено закрытие попапа по клику на фон
        if (Popup.closeOnBackgroundClick) {
            tint.off('click').on('click', function(){
                if (!$('body>.tint .popup:hover').length)
                    (showParams.backgroundClickCallback ? showParams.backgroundClickCallback : closerCallbackMain)();
            });
        }

        this.actionState = true;
        setTimeout(function(){
            Popup.actionState = false;

            // если включено закрытие попапа при нажатии Esc или подтверждение при нажатии Enter // запускать только по таймауту, иначе глюк события - отключается раньше полного появления попапа, при этом метод close блокируется, т.к. открытие попапа ещё не завершилось =)
            if (Popup.closeOnEsc || Popup.confirmOnEnter) {
                $(document).on('keydown',function keyupCallback(e){
                    if (!$('body>.tint.active').length) {
                        $(document).off('keydown',keyupCallback);
                        return false;
                    }

                    //$._data(document, "events"); // проверка эвентов на jQuery
                    var keyCode = e.hasOwnProperty('keyCode') ? e.keyCode : e.which;

                    if (Popup.closeOnEsc && keyCode === 27) {
                        (showParams.callbackOnEsc ? showParams.callbackOnEsc : closerCallbackMain)();
                        $(document).off('keydown',keyupCallback);
                    }

                    if (Popup.confirmOnEnter && keyCode === 13) {
                        (showParams.callbackOnEnter ? showParams.callbackOnEnter : (showParams.confirmBtnCallback ? showParams.confirmBtnCallback : closerCallbackMain))();
                        $(document).off('keydown',keyupCallback);
                    }
                });
            }
        },this.speed);

    };
    this.close = function() {
        /*
        два аргумента:
        1: function (callback, который выполнится перед закрытием)
        2: boolean (если имеет значение true, скрипт прерывается после вызова коллбека)
        */

        // если какое-то действие ещё не отработало - сразу выходим
        if (this.actionState)
            return false;

        // если первым аргументом был передан callback - выполнить его
        if (typeof arguments[0] === 'function')
            (arguments[0])();
        // если вторым аргументом было передано true - прервать скрипт
        if (arguments[1] === true)
            return false;

        var popup = $('.popup');
        popup.removeClass('active');
        $('body,html').removeClass('h_overflow');
        $('body').scrollTop(0);
        $(document).scrollTop(this.scrollTop);
        popup.hide(this.speed);

        this.actionState = true;
        setTimeout(function(){
            //$('html, body').stop(true);
            $('body>.tint').hide().removeClass('active');
            // проверяем, задана ли глобальная переменная с jQuery-объектом, на котором до этого был фокус
            if (typeof window.a3e95e180cc04c9d85ffdd8ebecef047 === 'object') {
                window.a3e95e180cc04c9d85ffdd8ebecef047.focus();
                delete window.a3e95e180cc04c9d85ffdd8ebecef047;
            }
            Popup.actionState = false;
        },this.speed);
        /*setTimeout(function(){
            Popup.actionState = false;
        },this.speed+1200);*/

        return false;
    };
};
