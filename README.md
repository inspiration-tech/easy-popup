simple-popup v.1.3
=============================

Простейший скрипт для работы с попапами. Также работает с CSS-стилями и HTML-шаблонами.

-----------
ЗАВИСИМОСТИ
-----------
Для работы требует ***jQuery***.

---------
УСТАНОВКА
---------
Если не подключен ***jQuery***, необходимо скачать и подключить его.

```html
<script src='путь к файлу/jquery-3.2.1.min.js'></script>
```

*либо для быстрого подключения воспользуйтесь абсолютной ссылкой*

```html
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
```
--- 

Для начала работы со скриптом попапа достаточно подключить файл в HTML-документе:

```html
<script src='путь к файлу/simple-popup.js'></script>
```

*или*

```html
<script src='путь к файлу/simple-popup.min.js'></script>
```

После этого уже можно обращаться к методам объекта ***popup***. Либо можно создать свой экземпляр объекта с заданными параметрами с помощью ***new***: 

```html
var myPopup = new Popup(params);
```

где ***params*** - объект с параметрами.


--------------------------------------------------------
СПИСОК ПАРАМЕТРОВ, КОТОРЫЕ ПРИНИМАЕТ КОНСТРУКТОР ПОПАПА:
--------------------------------------------------------
***Параметры принимаются в виде объекта с указанными ниже свойствами:***

  ***styleSheetTitle*** `string`
  
> ***title*** новой таблицы стилей (***title*** тега `style`) в DOM (используется только для проверки инициализации скрипта, далее всё пишется в уже существующую таблицу стилей). Для работы с попапами данный параметр не требуется.

  ***speed*** `number`
    
> Скорость попапа. По умолчанию установлено значение ***150***.

  ***closeOnBackgroundClick*** `boolean`
  
> Закрывать ли попап при клике на фон (`.tint`). Также при вызове попапа (метод ***show***) можно на клик по фону повесить свой callback (***backgroundClickCallback***).

  ***closeOnEsc*** `boolean`
  
> Закрывать ли попап при нажатии ***Esc***. Также при вызове попапа (метод ***show***) можно на нажатие ***Esc*** повесить свой callback (***callbackOnEsc***).

  ***confirmOnEnter*** `boolean`
  
> Если установлен в *true*, то при нажатии ***Enter*** запускается callback, привязанный к кнопке подтверждения (`.confirm_button`), если такая кнопка есть; если такой кнопки нет - запускается callback закрытия (***closerCallback***). Также при вызове попапа (метод ***show***) можно на нажатие ***Enter*** повесить свой callback (***callbackOnEnter***).

  ***templates*** `object`
      
> Объект с дополнительными шаблонами попапов, которые нужно добавить к уже имеющимся, а также с элементами, которые нужно удалить из имеющихся (например, если передано свойство ***confirm*** со значением *false*, внутри блока `.tint` производится поиск всех элементов `css.popup[data-name="confirm"]`, и все найденные элементы удаляются).


  ***styles*** `object`
    
> Объект с кастомизированными стилями для попапов, которые перезапишут/дополнят дефолтные стили (если передано значение *false*, то стили из js-скрипта не применяются, включая медиазапросы, по умолчанию установлено в *true*, т.е. применяются дефолтные стили, заданные в скрипте, включая медиазапросы). Вместо работы со стилями через js возможно подключить css-файл (см. папку css).

  ***mediaStyles*** `object`
    
> Объект с кастомизированными медиазапросами (структура аналогична объекту ***styles***, только тут каждый такой объект дополнительно оборачивается в строку медиазапроса), для обработки медиазапросов ***styles*** не должен быть равен *false*. Если ***mediaStyles*** равен *false*, медиазапросы из js-скрипта не применяются.

  ***replaceStyles*** `boolean`
    
> По умолчанию свойства объекта каждого селектора в переданных параметрах дополняют свойства соответствующего объекта в стилях по умолчанию, т.е. учитываются и те, которые заданы по умолчанию, и переданные в параметрах. Если ***replaceStyles*** установлен в *true*, то объект стилей по умолчанию (для каждого селектора) полностью перезаписывается на тот, который был передан в параметрах, даже если там всего одно свойство, или вообще их нет.

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

-----------------------------------
### close (закрыть попап):

***Принимается два параметра:***

  `function`
  
> Callback, который выполнится перед закрытием попапа.

  `boolean`
  
> Если имеет значение *true*, скрипт прерывается после вызова коллбека. Если не передан - по умолчанию после вызова коллбека попап закрывается.

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
