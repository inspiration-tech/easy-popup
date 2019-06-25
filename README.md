simple-popup v.3.0.0
=============================

Простейший скрипт для работы с попапами. Также работает с CSS-стилями и HTML-шаблонами.

-----------
ЗАВИСИМОСТИ
-----------
Отсутствуют.

---------------------------------------
ПОДКЛЮЧЕНИЕ В КАЧЕСТВЕ ПРОСТОГО СКРИПТА
---------------------------------------
Подключается обычным способом через html:

```html
<script src='src/simple-popup.js'></script>
```

*или*

```html
<script src='src/simple-popup.min.js'></script>
```

--------------------------------
ПОДКЛЮЧЕНИЕ В КАЧЕСТВЕ JS-МОДУЛЯ
--------------------------------

Чтобы подключить в качестве js-модуля, необходимо перейти в директорию проекта 

`cd my/project/path`

и выполнить команду

`npm i --save simple-popup`

а затем в файле приложения выполнить импорт:

```html
import {SimplePopup} from 'simple-popup';
```

-------------
ИНИЦИАЛИЗАЦИЯ
-------------

Для инициализации необходимо создать экземпляр объекта SimplePopup с заданными параметрами с помощью ***new***: 

```html
var myPopup = new SimplePopup(params);
```

где ***params*** - объект с параметрами.

------------------
ПОДКЛЮЧЕНИЕ СТИЛЕЙ
------------------

Возможно подключение стилей обычным способом и при инициализации скрипта.   

Обычный способ: 

```html
<link rel="stylesheet" href='src/css/simple-popup_v2.css'>
```

или

```html
<link rel="stylesheet" href='src/css/simple-popup_v2.min.css'>
```

Альтернативный вариант - включить встроенные стили при инициализации скрипта, для этого необходимо в конструктор попапа передать два параметра:

```html
var myPopup = new SimplePopup({
    styles: true,
    mediaStyles: true
});
```

Чтобы работали стили, эти два параметра не должны принимать значение ***false***. Следовательно, не обязательно передавать ***true***, а можно передать объект со своими пользовательскими стилями.   

Также возможно полностью отказаться от подключения предложенных стилей и написать все стили полностью самостоятельно.

--------------------------------------------------------
СПИСОК ПАРАМЕТРОВ, КОТОРЫЕ ПРИНИМАЕТ КОНСТРУКТОР ПОПАПА:
--------------------------------------------------------
***Параметры принимаются в виде объекта с указанными ниже свойствами:***

  ***styleSheetTitle*** `string`
  
> ***title*** новой таблицы стилей (***title*** тега `style`) в DOM (используется только для проверки инициализации скрипта, далее всё пишется в уже существующую таблицу стилей). Для работы с попапами данный параметр не требуется.

  ***speed*** `number`
    
> Скорость попапа. По умолчанию установлено значение ***150***.

  ***allowBackgroundCallback*** `boolean`
  
> Разрешить ли выполнение коллбека при клике на фон (`.simple-popup-tint`). Если коллбек разрешен, то по умолчанию клик по фону закрывает попап. Также в методе ***show*** на клик по фону можно повесить свой коллбек (***backgroundClickCallback***).

  ***allowCallbackOnEsc*** `boolean`
  
> Разрешить ли выполнение коллбека при нажатии ***Esc***. Если коллбек разрешен, то по умолчанию нажатие ***Esc*** закрывает попап. Также в методе ***show*** на клавишу ***Esc*** можно повесить свой коллбек (***callbackOnEsc***).

  ***allowCallbackOnEnter*** `boolean`
  
> Разрешить ли выполнение коллбека при нажатии ***Enter***. Если коллбек разрешен, то по умолчанию нажатие ***Enter*** запускает коллбек подтверждения ***confirmBtnCallback***, при этом по умолчанию он равен пустой функции `function(){}`. Если ***confirmBtnCallback*** принимает значение *false*, - запускается коллбек закрытия (***closerCallback***). Также в методе ***show*** на клавишу ***Enter*** можно повесить свой отдельный коллбек (***callbackOnEnter***).

  ***templates*** `object`
      
> Объект с дополнительными шаблонами попапов, которые нужно добавить к уже имеющимся, а также с элементами, которые нужно удалить из имеющихся (например, если передано свойство ***confirm*** со значением *false*, внутри блока `.simple-popup-tint` производится поиск всех элементов `.simple-popup[data-name="confirm"]`, и все найденные элементы удаляются).


  ***styles*** `object`
    
> Объект с кастомизированными стилями для попапов, которые перезапишут/дополнят дефолтные стили (если передано значение *false*, то стили из js-скрипта не применяются, включая медиазапросы, по умолчанию установлено в *false*, т.е. дефолтные стили, заданные в скрипте, не применяются). Вместо работы со стилями через js возможно подключить css-файл (см. папку css).

  ***mediaStyles*** `object`
    
> Объект с кастомизированными медиазапросами (структура аналогична объекту ***styles***, только тут каждый такой объект дополнительно оборачивается в строку медиазапроса), для обработки медиазапросов ***styles*** не должен быть равен *false*. Если ***mediaStyles*** равен *false*, медиазапросы из js-скрипта не применяются. По умолчанию принимает значение *false*.

  ***replaceStyles*** `boolean`
    
> По умолчанию свойства объекта каждого селектора в переданных параметрах дополняют свойства соответствующего объекта в стилях по умолчанию, т.е. учитываются и те, которые заданы по умолчанию, и переданные в параметрах. Если ***replaceStyles*** установлен в *true*, то объект стилей по умолчанию (для каждого селектора) полностью перезаписывается на тот, который был передан в параметрах, даже если там всего одно свойство, или вообще их нет.

  ***minLoadingTime*** `number`
    
> Минимальное время, в течение которого должна отображаться анимация (или картинка) загрузки при использовании метода ***setLoading***.

  ***loadingPic*** `string`
    
> URL анимации или картинки, которая должна отображаться в качестве индикатора загрузки при использовании метода ***setLoading***. Поддерживается передача строки в виде *base64*. По умолчанию отображаются маленькие песочные часы в целях компактности. Если требуется полноценная анимированная картинка, можно поставить свою, либо подключить картинку `loading.gif` из папки *src/img*.

  ***appendTo*** `string | false`
    
> Селектор, в который будет вставлен html-код скрипта. Формат написания селектора стандартный, как в css. Если передано *false*, то html-код скрипта будет вставлен в селектор по умолчанию.

  ***noScrollTop*** `boolean`
    
> Запретить автопрокрутку (скроллинг) попапов с помощью метода ***scrollTop***. Также данный параметр (если равен *true*) отключает присвоение элементам css-класса ***simple-popup_overflow***.

  ***defaultAnimationShow*** `string`
    
> Название css-анимации (заданной с помощью @keyframes), используемой по умолчанию при открытии попапа. Если данный параметр не передан, по умолчанию используется встроенная анимация ***simplePopupShow***.

  ***defaultAnimationClose*** `string`
    
> Название css-анимации (заданной с помощью @keyframes), используемой по умолчанию при открытии попапа. Если данный параметр не передан, по умолчанию используется встроенная анимация ***simplePopupClose***.

  ***id*** `string`
    
> Уникальный идентификатор объекта попапа, присваиваемый элементу `.simple-popup-tint` с помощью дата-атрибута ***data-id***. По умолчанию в качестве идентификатора генерируется и присваевается случайная строка (от даты и рандомного числа). Данный атрибует присваивается каждый раз при создании нового экземпляра попапа (за исключением случаев, когда в целевом родительском элементе (***appendTo***) уже существует элемент `.simple-popup-tint` с атрибутом ***data-id***). В случае когда в целевом родительском элементе уже существует элемент `.simple-popup-tint` с атрибутом ***data-id***, значение этого ***data-id*** присваевается объекту попапа в качестве ***id*** (т.е. свойство объекта попапа перезаписывается из дата-атрибута).

----------------
ОСНОВНЫЕ МЕТОДЫ:
----------------

### show (показать попап):

***Так же как и в конструкторе попапа, параметры принимаются в виде объекта. Свойства объекта описаны ниже:***

  ***title*** `string`
  
> Заголовок попапа.

  ***text*** `string`
  
> Текст попапа.

  ***btnEvents*** `boolean`
  
> Включить/отключить события при клике на кнопки `.closing_button` и `.confirm_button`.

  ***name*** `string`
  
> Имя попапа, который вызывается (атрибут ***data-name***). По умолчанию - ***message***.

  ***html*** `string`
  
> Применить HTML-шаблон, если он передан (при этом игнорируются параметры ***title***, ***text*** и ***name***).

  ***closerCallback*** `function | object`
  
> Callback, который вызывается при нажатии на `.closer`. Если является объектом, то принимается два свойства: `closerOff` (если нужно отключить закрытие попапа - установить в `true`) и `callback` (непосредственно передаваемый callback, который будет вызываться при закрытии)

  ***closingBtnCallback*** `function`
  
> Если на `.closing_button` нужно повесить отдельный callback - передать сюда (если передан - заменит дефолтный).

  ***confirmBtnCallback*** `function`
  
> Если на `.confirm_button` нужно повесить отдельный callback - передать сюда (если передан - заменит дефолтный).

  ***backgroundClickCallback*** `function`
  
> Если при клике на `.tint` (фон) нужен отдельный callback - передать сюда.

  ***callbackOnEsc*** `function`
  
> Если при нажатии ***Esc*** нужен отдельный callback - передать сюда.

  ***callbackOnEnter*** `function`
  
> Если при нажатии ***Enter*** нужен отдельный callback - передать сюда.

  ***closingBtnText*** `string`
  
> Задать свой текст для кнопки закрытия `.closing_button` (принимает HTML).

  ***confirmBtnText*** `string`
  
> Задать свой текст для кнопки подтверждения `.confirm_button` (принимает HTML).

  ***animationShow*** `string`
  
> Название css-анимации (заданной с помощью @keyframes), используемой для открытия данного конкретного попапа, т.е. однократно. Если данный параметр не передан, используется анимация для открытия попапа по умолчанию.

  ***animationClose*** `string`
  
> Название css-анимации (заданной с помощью @keyframes), используемой для анимации закрытия ранее открытого попапа, т.е. однократно. Пояснение: если текущий попап вызывается при ранее открытых, но ещё не закрытых попапах, то происходит замена старого попапа на текущий, при этом старый будет закрываться с анимацией, переданной в данный параметр. Если данный параметр не передан, используется анимация для закрытия попапа по умолчанию.

-----------------------------------
### close (закрыть попап):

***Параметры принимаются в виде объекта. Свойства объекта описаны ниже:***

***callback*** `function`
  
> Callback, который выполнится перед закрытием попапа.

***stopAfterCallback*** `boolean`
  
> Если имеет значение *true*, скрипт прерывается после вызова коллбека. Если не передан - по умолчанию после вызова коллбека попап закрывается.

***animationClose*** `string`
  
> Название css-анимации (заданной с помощью @keyframes), используемой для закрытия данного конкретного попапа, т.е. однократно. Если данный параметр не передан, используется анимация для закрытия попапа по умолчанию.

-----------------------------------
### setLoading (показать полноэкранный индикатор загрузки поверх всего остального контента):

***Принимается два параметра:***

  `number`
  
> Минимальное время, в течение которого должна отображаться анимация (или картинка) загрузки.

  `string`
  
> URL анимации или картинки, которая должна отображаться в качестве индикатора загрузки. Поддерживается передача строки в виде *base64*.

-----------------------------------
### unsetLoading (скрывает индикатор загрузки, вызванный методом setLoading):

***Используется без передачи параметров***

-------------
ПРИМЕР ВЫЗОВА
-------------
См. пример использования в файле ***example.js***.

-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 1.3
-------------
1) Убрана автоматическая инициализация
2) Поправлены мелкие баги со стилями
3) styles и mediaStyles теперь по умолчанию равны false
4) добавлена папка с дефолтными CSS-стилями (подключать не обязательно)
5) добавлен файл .json для composer


-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 1.3.1
-------------
1) Исправлено обращение к элементу .tint на body>.tint
2) объект Popup перенесён в область видимости window

-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 1.3.2
-------------
1) Изменён параметр по умолчанию для ***closingBtnText*** (в попапе `confirm` теперь равен **'Отклонить'**, в попапе `message` равен **'OK'**, в остальных случаях равен ***false***). Параметр по умолчанию срабатывает только для двух указанных попапов, в том числе - если передано ***false*** (по строгому сравнению).
2) Изменён параметр по умолчанию для ***confirmBtnText*** (в попапе `confirm` теперь равен **'Подтвердить'**). Параметр по умолчанию срабатывает только для указанного попапа, в том числе - если передано ***false*** (по строгому сравнению).

-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 1.3.3
-------------
Исправлен баг со скроллом после открытия попапа.

-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 1.3.4
-------------
1) Класс ***h_overflow***, используемый при динамическом создании css-стилей через js, также внесён в css-файлы.
2) К объекту ***Popup*** добавлено свойство ***isActive***, равное *true*, если какой-либо попап открыт, и равное *false* - если нет.
3) Последнее положение скролла запоминается только если попап закрыт, а если открыт - используется сохранённое значение.



-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 2.0.0
-------------
1) Изменены основные CSS-классы попапа:

    `.tint` -> `.simple-popup-tint`
    
    `.popup` -> `.simple-popup`
    
    `.heading` -> `.simple-popup__heading`
    
    `.body` -> `.simple-popup__body`
    
    `.text` -> `.simple-popup__text`
    
    `.closer` -> `.simple-popup__closer`
    
    `.h_overflow` -> `.simple-popup_overflow`
    
2) Добавлены методы ***setLoading*** и ***unsetLoading***, отвечающие за отображение/скрытие полноэкранного индикатора загрузки (подробное описание см. выше в списке методов).
3) В конструктор попапа добавлен параметр ***minLoadingTime***, обозначающий минимальное время, в течение которого должна отображаться анимация загрузки, а также параметр ***loadingPic*** - URL картинки, которая будет использоваться в качестве индикатора загрузки.
4) Объект попапа переименован из ***Popup*** в ***SimplePopup***.
5) Все методы объекта ***SimplePopup*** теперь возвращают сам этот объект.
6) Свойство ***scrollTop*** удалено из конструктора, т.к. оно должно меняться только специальными обработчиками.



-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 2.0.1
-------------
Класс ***simple-popup_overflow*** не проставляется для устройств с ios



-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 2.1.0
-------------
В методе ***show*** теперь можно передавать параметр ***name*** со значением *false*, в таком случае не будет активного окна попапа (полезно, например, при использовании метода ***setLoading***).



-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 2.2.0
-------------
1) В конструктор добавлен параметр ***appendTo***, обозначающий селектор, в который будет вставлен html-код скрипта.
2) В конструктор добавлен параметр ***noScrollTop***, запрещающий автопрокрутку (скроллинг) попапов.


-------------
ИЗМЕНЕНИЯ В ВЕРСИИ 3.0.0
-------------
1) ***jQuery*** исключён из списка зависимостей. В скрипте теперь используется только нативный js.
2) Изменён принцип анимации. Теперь используется анимация на базе css (***@keyframes***). Скрипт содержит анимацию по умолчанию, но также принимает пользовательские анимации. Анимация по умолчанию может быть изменена через конструктор, но также возможно передавать анимации для отдельных операций открытия/закрытия в методы ***show*** и ***close***. Подробности вызова см. выше.
3) Добавлена поддержка подключения скрипта в качестве модуля (подробности подключения см. выше).
4) Исправлены коллбеки, выполняющиеся при событиях.
5) Переименованы три метода конструктора в соответствии со своим смысловым назначением:

    `closeOnBackgroundClick` -> `allowBackgroundCallback`
    
    `closeOnEsc` -> `allowCallbackOnEsc`
    
    `confirmOnEnter` -> `allowCallbackOnEnter`
    
6) Элементу `.simple-popup-tint` теперь присваивается атрибут ***data-id***, содержащий уникальный идентификатор объекта попапа. Данный атрибут присваивается каждый раз при создании нового экземпляра попапа (за исключением случаев, когда в целевом родительском элементе (***appendTo***) уже существует элемент `.simple-popup-tint` с атрибутом ***data-id***). В конструктор добавлен параметр ***id***, позволяющий задать идентификатор вручную. Если данный параметр не передан, по умолчанию генерируется случайный идентификатор.
7) Картинка загрузки по умолчанию (***loadingPic***) заменена на более компактную в целях оптимизации. Если требуется подключить предыдущую, можно сделать это через параметры. Старая картинка находится в папке *img* (`loading.gif`).
