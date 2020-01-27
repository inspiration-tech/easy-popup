// https://github.com/inspiration-tech/easy-popup

export class EasyPopup {

    constructor(params = {}) {
        var defaults = {
                speed: 150,
                styles: false,
                replaceStyles: false,
                mediaStyles: false,
                templates: true,
                allowBackgroundCallback: true,
                allowCallbackOnEsc: true,
                allowCallbackOnEnter: true,
                minLoadingTime: 0,
                loadingPic: false,
                appendTo: false,
                noScrollTop: false,
                defaultAnimationShow: 'easyPopupShow',
                defaultAnimationClose: 'easyPopupClose',
                id: (+new Date + Math.floor(Math.random() * 10E+10)).toString(36),
                hideOnIos: false
            },
            defaultPopupParent = 'body',
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

                        for (var prop in paramStyleObj[customSelector]) {
                            if (!paramStyleObj[customSelector].hasOwnProperty(prop))
                                continue;

                            scriptStyleObj[customSelector][prop] = paramStyleObj[customSelector][prop];
                        }

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
            },
            defaultLoadingPic = 'data:image/png;base64,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';

        this.localFunctions = {
            // $(function(){});
            ready: function(fn) {
                if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
                    fn();
                } else {
                    document.addEventListener('DOMContentLoaded', fn);
                }
            },
            removeClass: function(el, className){
                if (el.classList)
                    el.classList.remove(className);
                else
                    el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
            },
            addClass: function (el, className){
                if (el.classList)
                    el.classList.add(className);
                else
                    el.className += ' ' + className;
            },
            hasClass: function(el, className){
                if (el.classList)
                    return el.classList.contains(className);
                else
                    return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);

            }
        };

        for (var prop in defaults) {
            if (!defaults.hasOwnProperty(prop))
                continue;

            this[prop] = params.hasOwnProperty(prop) ? params[prop] : defaults[prop];
        }

        this.actionState = false; // находится ли попап в процессе открытия/закрытия
        this.isActive = false; // открыт ли сейчас какой-либо попап
        this.isLoading = false; // открыт ли сейчас какой-либо попап
        this.delayedLoading = null; // индикатор таймаута на запуск статуса загрузки
        this.closeAfterDelay = false; // требуется ли закрыть попап после завершения периода задержки
        this.defaultLoadingPic = this.loadingPic && typeof this.loadingPic === 'string' ? this.loadingPic : defaultLoadingPic; // картинка загрузки, используемая по умолчанию
        this.scrollTop = null;

        StyleSheet = document.querySelector('style[title="'+titleHashBase+'"]');

        if (params.hasOwnProperty('styleSheetTitle') && params.styleSheetTitle === titleHashBase)
            specialHashInit = true;

        // если это не базовый автовызов - почистить таблицу стилей
        if (!specialHashInit && StyleSheet)
            StyleSheet.innerHTML = '';


        var templates = {
            message: '<div class="easy-popup" data-name="message">' +
                        '<div class="easy-popup__closer">' +
                            '<div></div>' +
                            '<div></div>' +
                        '</div>' +
                        '<div class="easy-popup__heading"></div>' +
                        '<div class="easy-popup__body">' +
                            '<div class="easy-popup__text"></div>' +
                            '<div class="button_wrapper">' +
                                '<button class="closing_button" id="close_btn">ОК</button>' +
                            '</div>' +
                        '</div>' +
                     '</div>',
            confirm: '<div class="easy-popup" data-name="confirm">' +
                        '<div class="easy-popup__closer">' +
                            '<div></div>' +
                            '<div></div>' +
                        '</div>' +
                        '<div class="easy-popup__heading"></div>' +
                        '<div class="easy-popup__body">' +
                            '<div class="easy-popup__text"></div>' +
                            '<div class="button_wrapper">' +
                                '<button class="confirm_button">Принять</button>' +
                                '<button class="closing_button">Отклонить</button>' +
                            '</div>' +
                        '</div>' +
                     '</div>'
        };

        if (typeof params.templates === 'object') {
            for (var customTemplate in params.templates) {
                if (!params.templates.hasOwnProperty(customTemplate))
                    continue;

                templates[customTemplate] = params.templates[customTemplate];
            }
        }

        // $(function(){});
        this.localFunctions.ready(()=>{
            var popupSelector = this.appendTo ? this.appendTo : defaultPopupParent,
                popupParent = document.querySelector(popupSelector),
                popupTint = document.querySelector(popupSelector + ' > .easy-popup-tint');

            if (popupTint)
                popupTint.dataset.id = this.id;
            else
                popupParent.innerHTML += '<div class="easy-popup-tint" data-id="'+this.id+'"></div>';

            var html = '';
            for (var name in templates) {
                if (!templates.hasOwnProperty(name))
                    continue;

                if (templates[name] === false) {
                    delete templates[name];
                    var popupItem = document.querySelectorAll('.easy-popup-tint[data-id="'+this.id+'"] .easy-popup[data-name="'+name+'"]');
                    if (popupItem.length) {
                        //popupItem.remove();
                        Array.prototype.forEach.call(popupItem, function(node){
                            node.parentNode.removeChild(node);
                        });
                    }
                    continue;
                }

                if (!document.querySelectorAll('.easy-popup-tint[data-id="'+this.id+'"] .easy-popup[data-name="'+name+'"]').length)
                    html += templates[name];
            }

            if (!document.querySelector('.easy-popup-tint[data-id="'+this.id+'"] .easy-popup__loading'))
                html += '<div class="easy-popup__loading"></div>';

            //$('.easy-popup-tint').append(html);
            document.querySelector('.easy-popup-tint[data-id="'+this.id+'"]').innerHTML += html;

            //$('.easy-popup').hide(); // по умолчанию у попапов display inline-block, поэтому нужно скрыть
            Array.prototype.forEach.call(document.querySelectorAll('.easy-popup'), function(node){
                node.style.display = 'none';
            });

            if (navigator.platform.indexOf('iPad') !== -1 || navigator.platform.indexOf('iPhone') !== -1) {
                if (['object','string'].includes(typeof this.hideOnIos)) {
                    this.localFunctions.addClass(document.body, 'easy-popup_ios');
                    this.localFunctions.addClass(document.querySelector('html'), 'easy-popup_ios');

                    let hideArr = typeof this.hideOnIos == 'string' ? this.hideOnIos.split(',') : this.hideOnIos;

                    document.querySelector('head').innerHTML += '<style title="'+titleHashBase+'_overflow"></style>';
                    let StyleSheet = document.querySelector('style[title="'+titleHashBase+'_overflow"]');

                    hideArr.forEach(function(v,i,arr){
                        StyleSheet.innerHTML += ' .easy-popup_overflow '+v+' {display: none} ';
                    });
                }
            }
        });



        if (this.styles && !(specialHashInit && StyleSheet)) {
            if (typeof this.styles !== 'object')
                this.styles = {};

            /*
            * ШАГ 1:
            * Объект scriptStyles содержит дефолтные стили для попапа, объект scriptMediaStyles - дефолтные медиазапросы. Объект this.styles дополняет объект scriptStyles (а объект this.mediaStyles дополняет объект scriptMediaStyles): если указанного селектора нет - он добавляется, если есть - то его объект CSS-стилей дополняется стилями из объекта this.styles (по соответствующему селектору), при этом если в значении одного из свойств указано false - данное свойство удаляется. Аналогичным образом, если в объекте this.styles передан селектор со значением false, то этот селектор удаляется из объекта scriptStyles.
            * */

            var scriptStyles = {
                '.easy-popup-tint': {
                    position: 'fixed',
                    display: 'none',
                    width: '100%',
                    height: '100vh !important',
                    overflowY: 'auto',
                    overflowX: 'hidden',
                    background: 'RGBA(0,0,0,0.7)',
                    zIndex: 10000,
                    left: 0,
                    right: 0,
                    top: 0,
                    bottom: 0,
                    textAlign: 'center',
                    verticalAlign: 'middle'
                },
                '.easy-popup_ios .easy-popup-tint': {
                    position: 'relative',
                    height: 'auto !important',
                    pointerEvents: 'auto'
                },
                '.easy-popup-tint::after': {
                    display: 'inline-block',
                    height: '100%',
                    content: '',
                    verticalAlign: 'middle'
                },
                '.easy-popup__loading': {
                    visibility: 'hidden',
                    position: 'fixed',
                    width: '100vw',
                    height: '100vh',
                    zIndex: '-1',
                    top: '0',
                    left: '0',
                    transition: 'all 150ms',
                    background: 'url('+this.defaultLoadingPic+') center center / 50px no-repeat rgba(255, 255, 255, 0.7)'
                },
                '.easy-popup-tint.is_loading .easy-popup__loading': {
                    visibility: 'visible',
                    zIndex: '10001'
                },
                'body .easy-popup-tint': {
                    // ios scroll fix
                    WebkitOverflowScrolling: 'touch',
                    overflowScrolling: 'touch'
                },
                '.easy-popup': {
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
                    boxShadow: '0 0 15px #fff',
                    WebkitTransform: 'translateZ(0px)'
                },
                '.easy-popup__heading': {
                    height: '43px',
                    background: '#34991b',
                    font: 'bold 30px/45px Arial',
                    color: '#fff',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    padding: '0 17px',
                    margin: 'auto'
                },
                '.easy-popup__body': {
                    padding: '12px 17px 27px'
                },
                '.easy-popup__closer': {
                    position: 'absolute',
                    width: '25px',
                    height: '25px',
                    right: '5px',
                    top: '8px',
                    cursor: 'pointer',
                    transition: 'all 280ms'
                },
                '.easy-popup__closer > div': {
                    position: 'absolute',
                    left: '11px',
                    width: '3px',
                    height: '25px',
                    background: '#fff',
                    borderRadius: '3px',
                    transition: 'all 280ms'
                },
                '.easy-popup__closer > div:nth-child(1)': {
                    WebkitTransform: 'rotate(45deg)',
                    transform: 'rotate(45deg)'
                },
                '.easy-popup__closer > div:nth-child(2)': {
                    WebkitTransform: 'rotate(-45deg)',
                    transform: 'rotate(-45deg)'
                },
                '.easy-popup__closer:hover': {
                    WebkitTransform: 'scale3d(1.3, 1.3, 0.2)',
                    transform: 'scale3d(1.3, 1.3, 0.2)'
                },
                '.easy-popup__closer:hover > div': {
                    background: '#9cd1d4'
                },
                '.easy-popup button, .easy-popup input[type="submit"]': {
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
                '.easy-popup button:hover, .easy-popup input[type="submit"]:hover': {
                    opacity: 0.7
                },
                '.easy-popup__body .closing_button': {
                    marginTop: '10px'
                },
                '.easy-popup__text': {
                    marginBottom: '16px',
                    textAlign: 'center'
                },
                '.easy-popup .input_wrapper': {
                    marginBottom: '10px'
                },
                '.easy-popup .button_wrapper button': {
                    display: 'inline-block',
                    marginLeft: '10px',
                    marginRight: '10px'
                },
                '.easy-popup-tint input, .easy-popup-tint button': {
                    WebkitTransform: 'translateZ(0px)'
                },
                'body.easy-popup_overflow, html.easy-popup_overflow': {
                    overflow: 'hidden !important',
                    height: '100vh',
                    width: '100%',
                    position: 'fixed'
                },
                'body.easy-popup_overflow.easy-popup_ios, html.easy-popup_overflow.easy-popup_ios': {
                    height: 'auto',
                    position: 'relative',
                    pointerEvents: 'none'
                }
            };

            var scriptMediaStyles = {
                '@keyframes easyPopupShow': {
                    'from': {
                        opacity: 0,
                        transform: 'scale3d(0.3, 0.3, 0.3)',
                        WebkitTransform: 'scale3d(0.3, 0.3, 0.3)'
                    },
                    '90%': {
                        opacity: 1
                    }
                },
                '@-webkit-keyframes easyPopupShow': {
                    'from': {
                        opacity: 0,
                        transform: 'scale3d(0.3, 0.3, 0.3)',
                        WebkitTransform: 'scale3d(0.3, 0.3, 0.3)'
                    },
                    '90%': {
                        opacity: 1
                    }
                },
                '@keyframes easyPopupClose': {
                    'from': {
                        opacity: 1,
                    },
                    '90%': {
                        opacity: 0,
                        transform: 'scale3d(0.3, 0.3, 0.3)',
                        WebkitTransform: 'scale3d(0.3, 0.3, 0.3)'
                    },
                    'to': {
                        opacity: 0
                    }
                },
                '@-webkit-keyframes easyPopupClose': {
                    'from': {
                        opacity: 1,
                    },
                    '90%': {
                        opacity: 0,
                        transform: 'scale3d(0.3, 0.3, 0.3)',
                        WebkitTransform: 'scale3d(0.3, 0.3, 0.3)'
                    },
                    'to': {
                        opacity: 0
                    }
                }
            };

            if (this.replaceStyles) {
                //scriptStyles = $.extend(scriptStyles, this.styles);
                for (var prop1 in this.styles) {
                    if (!this.styles.hasOwnProperty(prop1))
                        continue;

                    scriptStyles[prop1] = this.styles[prop1];
                }
            } else {
                scriptStyles = styleHandler.processObj(scriptStyles, this.styles);
            }

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

                    if (this.replaceStyles) {
                        //scriptMediaStyles[mediaQuery] = $.extend(scriptMediaStyles[mediaQuery], this.mediaStyles[mediaQuery]);
                        for (var prop2 in this.mediaStyles[mediaQuery]) {
                            if (!this.mediaStyles[mediaQuery].hasOwnProperty(prop2))
                                continue;

                            scriptMediaStyles[mediaQuery][prop2] = this.mediaStyles[mediaQuery][prop2];
                        }
                    } else {
                        scriptMediaStyles[mediaQuery] = styleHandler.processObj(scriptMediaStyles[mediaQuery], this.mediaStyles[mediaQuery]);
                    }

                }
            }


            /*
            * ШАГ 2:
            * Если в DOM ещё не создана таблица стилей (тег style) данным скриптом, то она создаётся.
            * Берётся объект scriptStyles, и каждый его селектор с соответствующим объектом CSS-стилей преобразуются в необходимый формат и записываются в созданную таблицу стилей. То же самое делается для каждой строки медиазапроса в объекте scriptMediaStyles.
            * */

            if (!StyleSheet) {
                //$('head').append('<style title="'+titleHashBase+'"></style>');
                document.querySelector('head').innerHTML += '<style title="'+titleHashBase+'"></style>';
                StyleSheet = document.querySelector('style[title="'+titleHashBase+'"]');
            }


            for (var selector in scriptStyles) {
                if (!scriptStyles.hasOwnProperty(selector))
                    continue;

                selector = selector.trim().replace(/\s+/g, ' ');
                var selectorContent = styleHandler.objToCSS(scriptStyles[selector]);
                StyleSheet.innerHTML += selector + "{" + selectorContent + "}";
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
                    StyleSheet.innerHTML += mediaString + "{" + mediaHTML + "}";
                }
            }


        }
    }



    show(params = {}) {
        // если какое-то действие ещё не отработало - сразу выходим
        if (this.actionState)
            return this;

        // если были активные элементы - запоминаем и делаем неактивными
        var elemsWithFocus = document.querySelector(':focus');
        if (elemsWithFocus) {
            // сохраняем элемент, на которым был фокус глобально
            window.a3e95e180cc04c9d85ffdd8ebecef047 = elemsWithFocus;
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
                backgroundClickCallback: false, // если при клике на .easy-popup-tint (фон) нужен отдельный callback - передать сюда
                callbackOnEsc: false, // если при нажатии Esc нужен отдельный callback - передать сюда
                callbackOnEnter: false, // если при нажатии Enter нужен отдельный callback - передать сюда,
                closingBtnText: false,
                confirmBtnText: false,
                animationShow: false,
                animationClose: false,
                speed: false,
                closingSpeed: false
            },
            Popup = this,
            scrollingElement = document.scrollingElement || document.documentElement, // элемент, отвечающий за прокрутку документа
            elem;

        for (var prop in showParams) {
            if (!showParams.hasOwnProperty(prop))
                continue;

            if (params.hasOwnProperty(prop))
                showParams[prop] = params[prop];
        }

        // если заданы параметры скорости показа или закрытия попапа - используем их, иначе используем скорость попапа, указанную в объекте по умолчанию
        let closeSpeed = showParams.closingSpeed !== false ? showParams.closingSpeed : this.speed,
            showSpeed = showParams.speed !== false ? showParams.speed : this.speed;

        // смотрим, есть ли уже открытые (активные) попапы
        var activePopups = document.querySelectorAll('.easy-popup.active');
        if (activePopups.length){
            var animationNameOut = showParams.animationClose && typeof showParams.animationClose === 'string' ? showParams.animationClose : this.defaultAnimationClose,
                animationStringOut = closeSpeed + 'ms ' + animationNameOut + ' 1 linear';

            Array.prototype.forEach.call(activePopups, (node)=>{
                this.localFunctions.removeClass(node, 'active');
                node.style.WebkitAnimation = animationStringOut;
                node.style.animation = animationStringOut;
            });

            let displayNoneCallback = ()=>{
                // всем попапам ставим display none и запускаем метод show снова, с теми же параметрами
                Array.prototype.forEach.call(document.querySelectorAll('.easy-popup'), function(node){
                    node.style.display = 'none';
                });
                this.show(showParams);
            };

            if (closeSpeed)
                setTimeout(displayNoneCallback, closeSpeed);
            else
                displayNoneCallback();

            return this;
        }

        // если имя попапа === false - нужно только показать тинт, а дальнейшая обработка не требуется
        if (showParams.name === false) {
            // отображение попапа (а точнее, тинта)
            var tintOnly = document.querySelector('.easy-popup-tint[data-id="'+this.id+'"]');
            tintOnly.style.display = 'block';
            this.localFunctions.addClass(tintOnly, 'active');
            this.isActive = true;

            return this;
        }

        elem = document.querySelector('.easy-popup-tint[data-id="'+this.id+'"] .easy-popup[data-name="'+showParams.name+'"]');
        if (!elem)
            elem = document.querySelector('.easy-popup-tint[data-id="'+this.id+'"] .easy-popup[data-name="'+(showParams.name = 'message')+'"]');
        if (!elem)
            elem = document.querySelector('.easy-popup-tint[data-id="'+this.id+'"] .easy-popup:first-child');

        // вставка контента в попап
        if (showParams.title !== false) {
            var popupHeading = elem.querySelector('.easy-popup__heading');
            if (popupHeading)
                popupHeading.innerHTML = showParams.title;
        }
        if (showParams.html) {
            var popupBody = elem.querySelector('.easy-popup__body');
            if (popupBody)
                popupBody.innerHTML = showParams.html;
        } else {
            if (showParams.text !== false) {
                var popupText = elem.querySelector('.easy-popup__text');
                if (popupText)
                    popupText.innerHTML = showParams.text;
            }
        }

        // текст кнопок
        var popupClosingButton = elem.querySelector('.closing_button'),
            popupConfirmButton = elem.querySelector('.confirm_button');

        if (popupClosingButton) {
            if (showParams.closingBtnText !== false) {
                popupClosingButton.innerHTML = showParams.closingBtnText;
            } else {
                if (showParams.name === 'confirm')
                    popupClosingButton.innerHTML = 'Отклонить';
                else if (showParams.name === 'message')
                    popupClosingButton.innerHTML = 'ОК';
            }
        }

        if (popupConfirmButton) {
            if (showParams.confirmBtnText !== false)
                popupConfirmButton.innerHTML = showParams.confirmBtnText;
            else {
                if (showParams.name === 'confirm')
                    popupConfirmButton.innerHTML = 'Подтвердить';
            }
        }

        // ставим scrollTop, но только если это не замена одного попапа другим
        if (!this.isActive)
            this.scrollTop = scrollingElement.scrollTop;
        // отображение попапа
        var tint = document.querySelector('.easy-popup-tint[data-id="'+this.id+'"]');
        tint.style.display = 'block';
        this.localFunctions.addClass(tint,'active');
        this.isActive = true;

        // если не отключена автопрокрутка
        if (!this.noScrollTop) {
            var bodyEl = document.querySelector('body'),
                htmlEl = document.querySelector('html'),
                className = 'easy-popup_overflow';

            this.localFunctions.addClass(htmlEl, className);
            this.localFunctions.addClass(bodyEl, className);

            // добавляем блокатор скролла, только если это не ios
            if (navigator.platform.indexOf('iPad') === -1 && navigator.platform.indexOf('iPhone') === -1) {
                bodyEl.scrollTop = this.scrollTop;
            }
        }

        if (!this.localFunctions.hasClass(elem,'active')) {
            elem.style.display = 'inline-block';
            this.localFunctions.addClass(elem,'active');

            var animationNameIn = showParams.animationShow && typeof showParams.animationShow === 'string' ? showParams.animationShow : this.defaultAnimationShow,
                animationStringIn = showSpeed + 'ms ' + animationNameIn + ' 1 linear';

            elem.style.WebkitAnimation = animationStringIn;
            elem.style.animation = animationStringIn;
        }

        var closingBtn = elem.querySelector('.closing_button'),
            confirmBtn = elem.querySelector('.confirm_button'),
            popupCloser = elem.querySelector('.easy-popup__closer');

        // если есть неснятые события от предыдущего попапа - снять их
        if (this.hasOwnProperty('keydownCallbackEsc')) {
            document.removeEventListener('keydown', this.keydownCallbackEsc);
            delete this.keydownCallbackEsc;
        }
        if (this.hasOwnProperty('keydownCallbackEnter')) {
            document.removeEventListener('keydown', this.keydownCallbackEnter);
            delete this.keydownCallbackEnter;
        }
        if (closingBtn && this.hasOwnProperty('closingBtnCallback')) {
            closingBtn.removeEventListener('click', this.closingBtnCallback);
            delete this.closingBtnCallback;
        }
        if (confirmBtn && this.hasOwnProperty('confirmBtnCallback')) {
            confirmBtn.removeEventListener('click', this.confirmBtnCallback);
            delete this.confirmBtnCallback;
        }
        if (tint && this.hasOwnProperty('tintCallback')) {
            tint.removeEventListener('click', this.tintCallback);
            delete this.tintCallback;
        }
        if (popupCloser && this.hasOwnProperty('closerCallbackMain')) {
            popupCloser.removeEventListener('click', this.closerCallbackMain);
            delete this.closerCallbackMain;
        }

        this.closerCallbackMain = ()=>{
            if (typeof showParams.closerCallback !== 'object' || !showParams.closerCallback.hasOwnProperty('closerOff') || showParams.closerCallback.closerOff !== true) {
                if (Popup.actionState)
                    return false;
                // базовый callback, который происходит при нажатии на .easy-popup__closer
                Popup.close();
            }

            if (typeof showParams.closerCallback === 'function')
                showParams.closerCallback();
            else if (typeof showParams.closerCallback === 'object' && showParams.closerCallback.hasOwnProperty('callback') && typeof showParams.closerCallback.callback === 'function')
                showParams.closerCallback.callback();

            if (popupCloser)
                popupCloser.removeEventListener('click', Popup.closerCallbackMain);
        };

        // событие на клоузер - вешаем коллбек, который отработает только один раз (в конце он удаляет сам себя)
        if (popupCloser)
            popupCloser.addEventListener('click', this.closerCallbackMain);
        // если события на кнопки не отключены
        if (showParams.btnEvents) {
            if (closingBtn) {
                this.closingBtnCallback = showParams.closingBtnCallback ? function closing(){
                    showParams.closingBtnCallback();
                    this.removeEventListener('click', closing);
                } : this.closerCallbackMain;
                closingBtn.addEventListener('click', this.closingBtnCallback);
            }
            if (confirmBtn) {
                this.confirmBtnCallback = showParams.confirmBtnCallback ? function confirm(){
                    showParams.confirmBtnCallback();
                    this.removeEventListener('click', confirm);
                } : this.closerCallbackMain;
                confirmBtn.addEventListener('click', this.confirmBtnCallback);
            }
        }
        // если включено закрытие попапа по клику на фон
        if (this.allowBackgroundCallback) {
            this.tintCallback = ()=>{
                if (!Popup.isLoading && !document.querySelector('.easy-popup-tint[data-id="'+Popup.id+'"] .easy-popup:hover')) {
                    (showParams.backgroundClickCallback ? showParams.backgroundClickCallback : Popup.closerCallbackMain)();
                    tint.removeEventListener('click', Popup.tintCallback);
                }
            };
            tint.addEventListener('click', this.tintCallback);
        }

        this.actionState = true;
        let showCompletedCallback = ()=>{
            this.actionState = false;

            // если включено закрытие попапа при нажатии Esc или подтверждение при нажатии Enter // запускать только по таймауту, иначе глюк события - отключается раньше полного появления попапа, при этом метод close блокируется, т.к. открытие попапа ещё не завершилось =)
            if (this.allowCallbackOnEsc) {
                // callback для Esc
                this.keydownCallbackEsc = (e)=>{
                    if (!Popup.isActive || Popup.isLoading) {
                        document.removeEventListener('keydown', Popup.keydownCallbackEsc);
                        return false;
                    }

                    //$._data(document, "events"); // проверка эвентов на jQuery
                    var keyCode = e.hasOwnProperty('keyCode') ? e.keyCode : e.which;

                    if (Popup.allowCallbackOnEsc && keyCode === 27) {
                        (showParams.callbackOnEsc ? showParams.callbackOnEsc : Popup.closerCallbackMain)();
                        document.removeEventListener('keydown', Popup.keydownCallbackEsc);

                    }
                };
                document.addEventListener('keydown', this.keydownCallbackEsc);
            }
            if (this.allowCallbackOnEnter) {
                // callback для Enter
                this.keydownCallbackEnter = (e)=>{
                    if (!Popup.isActive || Popup.isLoading) {
                        document.removeEventListener('keydown', Popup.keydownCallbackEnter);
                        return false;
                    }

                    //$._data(document, "events"); // проверка эвентов на jQuery
                    var keyCode = e.hasOwnProperty('keyCode') ? e.keyCode : e.which;

                    if (Popup.allowCallbackOnEnter && keyCode === 13) {
                        (showParams.callbackOnEnter ? showParams.callbackOnEnter : (showParams.confirmBtnCallback ? showParams.confirmBtnCallback : Popup.closerCallbackMain))();
                        document.removeEventListener('keydown', Popup.keydownCallbackEnter);
                    }
                };
                document.addEventListener('keydown', this.keydownCallbackEnter);
            }
        };

        if (showSpeed)
            setTimeout(showCompletedCallback, showSpeed);
        else
            showCompletedCallback();

        return this;
    }

    close(params = {}) {
        // если какое-то действие ещё не отработало - сразу выходим
        if (this.actionState)
            return this;

        /*
        принимает объект с параметрами:
        callback: function (callback, который выполнится перед закрытием),
        stopAfterCallback: boolean (если имеет значение true, скрипт прерывается после вызова коллбека),
        animationClose: string (имя анимации, которую применить при закрытии попапа)
        closeSpeed: number (скорость анимации закрытия)
        */
        var closeParams = {
                callback: false,
                stopAfterCallback: false,
                animationClose: false,
                speed: false
            };

        for (var prop in closeParams) {
            if (!closeParams.hasOwnProperty(prop))
                continue;

            if (params.hasOwnProperty(prop))
                closeParams[prop] = params[prop];
        }

        // если был передан callback - выполнить его
        if (typeof closeParams.callback === 'function')
            (closeParams.callback)();
        // если stopAfterCallback было передано true - прервать скрипт
        if (closeParams.stopAfterCallback === true)
            return this;

        // если задан параметр скорости закрытия попапа - используем его, иначе используем скорость попапа, указанную в объекте по умолчанию
        var closeSpeed = closeParams.speed !== false ? closeParams.speed : this.speed;

        var activePopups = document.querySelectorAll('.easy-popup.active');
        if (activePopups.length){
            var animationNameOut = closeParams.animationClose && typeof closeParams.animationClose === 'string' ? closeParams.animationClose : this.defaultAnimationClose,
                animationStringOut = closeSpeed + 'ms ' + animationNameOut + ' 1 linear';

            Array.prototype.forEach.call(activePopups, (node)=>{
                this.localFunctions.removeClass(node, 'active');
                node.style.WebkitAnimation = animationStringOut;
                node.style.animation = animationStringOut;
            });

            var displayNoneCallback = ()=>{
                // всем попапам ставим display none
                Array.prototype.forEach.call(document.querySelectorAll('.easy-popup'), function(node){
                    node.style.display = 'none';
                });
            };

            if (closeSpeed)
                setTimeout(displayNoneCallback, closeSpeed);
            else
                displayNoneCallback();
        }
        // если не отключена автопрокрутка
        if (!this.noScrollTop) {
            var scrollingElement = document.scrollingElement || document.documentElement,
                classToRemove = 'easy-popup_overflow';
            this.localFunctions.removeClass(document.querySelector('html'), classToRemove);
            this.localFunctions.removeClass(document.querySelector('body'), classToRemove);
            document.querySelector('body').scrollTop = 0;
            scrollingElement.scrollTop = this.scrollTop;
        }

        let closeCompleteCallback = ()=>{
            //$('html, body').stop(true);
            var tint = document.querySelector('.easy-popup-tint[data-id="'+this.id+'"]');
            tint.style.display = 'none';
            this.localFunctions.removeClass(tint, 'active');
            this.isActive = false;
            // проверяем, задана ли глобальная переменная с jQuery-объектом, на котором до этого был фокус
            if (typeof window.a3e95e180cc04c9d85ffdd8ebecef047 === 'object') {
                window.a3e95e180cc04c9d85ffdd8ebecef047.focus();
                delete window.a3e95e180cc04c9d85ffdd8ebecef047;
            }
            this.actionState = false;
        };

        this.actionState = true;

        if (closeSpeed)
            setTimeout(closeCompleteCallback, closeSpeed);
        else
            closeCompleteCallback();

        return this;
    }

    setLoading(minLoadingTime = false, loadingPic = false) {
        // добавляем класс загрузки
        this.isLoading = true;
        this.localFunctions.addClass(document.querySelector('.easy-popup-tint[data-id="'+this.id+'"]'), 'is_loading');

        // если задана картинка загрузки - ставим её на загрузку вместо стандартной крутилки (сначала проверяем - передана ли картинка напрямую в метод, потом - передана ли в конструктор)
        if (!loadingPic)
            loadingPic = this.defaultLoadingPic;
        document.querySelector('.easy-popup__loading').style.backgroundImage = 'url("'+loadingPic+'")';

        // получаем минимальное время загрузки
        if (minLoadingTime === false || minLoadingTime === null)
            minLoadingTime = Math.max(this.minLoadingTime, this.speed);

        let setLoadingCallback = ()=>{
            // после запуска скрипта таймаута сразу почистить переменную (prevent duplicate calls)
            this.delayedLoading = null;

            // если в течение таймаута был запрос на снятие класса загрузки из метода unsetLoading - повторно обратиться к этому методу (в этот раз он отработает, т.к. delayedLoading уже равен null)
            if (this.closeAfterDelay) {
                this.closeAfterDelay = false;
                this.unsetLoading();
            }
        };

        if (minLoadingTime)
            // установить таймаут - минимальное время, в течение которого должна отображаться анимация загрузки
            this.delayedLoading = setTimeout(setLoadingCallback, minLoadingTime);
        else
            setLoadingCallback();

        return this;
    }

    unsetLoading() {
        // если запущен таймаут, то по истечении этого таймаута нужно спрятать индикатор загрузки
        if (this.delayedLoading) {
            this.closeAfterDelay = true;
            return this;
        }

        // таймаут не установлен, - значит снять класс загрузки
        this.isLoading = false;
        this.localFunctions.removeClass(document.querySelector('.easy-popup-tint[data-id="'+this.id+'"]'), 'is_loading');

        return this;
    }

}