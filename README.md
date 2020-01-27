easy-popup v.3.2.2
=============================

Name in the previous versions: *simple-popup*.   
Simple script for work with popups. Also works with CSS styles and HTML templates. 

Read this in other languages:  
[Russian](README.ru.md)

------------
DEPENDENCIES
------------
None.

----------------------
USE AS A SIMPLE SCRIPT
----------------------
Linked to html in a regular way:

```html
<script src='src/easy-popup.js'></script>
```

*or*

```html
<script src='src/easy-popup.min.js'></script>
```

------------------
USE AS A JS-MODULE
------------------

In order to use it as a js-module, it is necessary to cd into the project directory 

`cd my/project/path`

and to execute the command

`npm i --save easy-popup`

and then to execute import in the application file:

```html
import {EasyPopup} from 'easy-popup';
```

---------------------------
INSTALLATION USING COMPOSER
---------------------------

At the moment the package is not in Composer. But still it is possible to require it as an npm asset. To install the package in this way Composer Packagist can be used. To use Packagist add the following entry to your ***composer.json*** file:

```html
"repositories":[
    {
        "type": "composer",
        "url": "https://asset-packagist.org"
    }
],
```

Then you only need to ***require*** the package as follows (indicate the required version, if necessary):

```html
"require": {
    "npm-asset/easy-popup": "^3.0.3" 
},
```

If the required version fails to install, it is necessary to update the npm package information [in Packagist](https://asset-packagist.org/package/npm-asset/easy-popup).

For installation to a custom path see [these instructions](https://asset-packagist.org/site/about).

--------------
INITIALIZATION
--------------

For initialization it is necessary to create an instance of ***EasyPopup*** object with required parameters using ***new***: 

```html
var myPopup = new EasyPopup(params);
```

where ***params*** is the parameter object.

------------
USING STYLES
------------

It is possible to include styles in the regular way or at the moment of script initialization. 

The regular way: 

```html
<link rel="stylesheet" href='src/css/easy-popup.css'>
```

or

```html
<link rel="stylesheet" href='src/css/easy-popup.min.css'>
```

An alternative is to enable the built-in styles at the time of script initialization, to do this it is necessary to pass two parameters to the popup constructor:

```html
var myPopup = new EasyPopup({
    styles: true,
    mediaStyles: true
});
```

For the styles to work, these two parameters' value must not be ***false***. Therefore, it is not necessary to pass ***true***, one can pass an object with custom user styles instead.   

It is also possible to completely omit the suggested styles and write the whole styling on your own.

---------------------------------
POPUP CONSTRUCTOR PARAMETER LIST:
---------------------------------
***Parameters are accepted as an object with the following properties:***

  ***styleSheetTitle*** `string`
  
> ***title*** of the new style sheet (***title*** of the `style` tag) in DOM (used for script initialization test only, then everything is written to the existing style sheet). This parameter is not required for work with popups.

  ***speed*** `number`
    
> Popup speed. The default value is ***150***.

  ***allowBackgroundCallback*** `boolean`
  
> Allow callback execution on background click (`.easy-popup-tint`). If the callback is allowed, then by default a background click closes the popup. Also the ***show*** method allows to attach your own callback to the background click (***backgroundClickCallback***).

  ***allowCallbackOnEsc*** `boolean`
  
> Allow callback execution on ***Esc*** keypress. If the callback is allowed, then by default pressing ***Esc*** closes the popup. Also the ***show*** method allows to attach your own callback to ***Esc*** keypress (***callbackOnEsc***).

  ***allowCallbackOnEnter*** `boolean`
  
> Allow callback execution on ***Enter*** keypress. If the callback is allowed, then by default pressing ***Enter*** triggers the confirmation callback ***confirmBtnCallback***, that said, it defaults to an empty function `function(){}`. If the value of ***confirmBtnCallback*** is *false*, the closing callback is triggered (***closerCallback***). Also the ***show*** method allows to attach your own callback to ***Enter*** keypress (***callbackOnEnter***).

  ***templates*** `object`
      
> Object with additional popup templates, which should be added to the existing ones, as well as elements, which should be removed from the existing ones (for example, if property ***confirm*** is passed with value *false*, inside the `.easy-popup-tint` block search for all `.easy-popup[data-name="confirm"]` elements is executed, and all found elements are removed).


  ***styles*** `object`
    
> Object with custom popup styles, which will overwrite/add to the default styles (if *false* is passed as the value, then the styles from the js script are not accepted, including media queries, by default it is set to *false*, i.e. the default styles defined in the script are not applied). Instead of work with styles via js it is possible to include a css file (see folder *css*).

  ***mediaStyles*** `object`
    
> Object with custom media queries (the structure is equivalent to object ***styles***, but here each of such objects is additionally wrapped with a media query string), for media queries to be processed ***styles*** must not be set to *false*. If ***mediaStyles*** is set to *false*, the media queries from the js script are not applied. By default it is set to *false*.

  ***replaceStyles*** `boolean`
    
> By default the properties of each selector object in the passed parameters are added to the corresponding property object in the default styles, i.e. both default and passed ones are recognized. If ***replaceStyles*** is set to *true*, then the default style object (for each selector) is completely overwritten to that passed in the parameters, even if it has only one property, or no properties at all.

  ***minLoadingTime*** `number`
    
> Minimal time during which the loading animation (or image) should be displayed when using the ***setLoading*** method.

  ***loadingPic*** `string`
    
> URL of the animation or image that should be displayed as a loading indicator when using the ***setLoading*** method. Passing a string in *base64* is supported. By default a small sand glass is displayed for file size reasons. If there is a need in a fully functional animated image, you can set your own one, or use the `loading.gif` image from the *src/img* folder.

  ***appendTo*** `string | false`
    
> Selector to which the script html code will be appended. The format for writing the selector is standard, the same as in css. If *false* is passed, then the script html code will be appended to the default selector.

  ***noScrollTop*** `boolean`
    
> Forbid popup auto scrolling using the ***scrollTop*** method. Also this parameter (if set to *true*) disables adding the ***easy-popup_overflow*** css class to elements.

  ***defaultAnimationShow*** `string`
    
> Name of the css animation (as defined in @keyframes), used by default during popup opening. If this parameter is not passed, the built-in animation ***easyPopupShow*** is used by default.

  ***defaultAnimationClose*** `string`
    
> Name of the css animation (as defined in @keyframes), used by default during popup closing. If this parameter is not passed, the built-in animation ***easyPopupClose*** is used by default.

  ***id*** `string`
    
> Unique popup object identifier assigned to the `.easy-popup-tint` element by means of the ***data-id*** data attribute. By default a random string (from the date and a random number) is generated and assigned as the identifier. This attribute is assigned each time when creating a new popup instance (except for the cases when the target parent element (***appendTo***) already has the `.easy-popup-tint` element with the ***data-id*** attribute). In case the target parent element already has the `.easy-popup-tint` element with the ***data-id*** attribute, the value of this ***data-id*** is assigned to the popup object as its ***id*** (i.e. the popup object property is overwritten from tha data attribute).

  ***hideOnIos*** `false | string | object`
    
> This parameter accepts a selector string or an array of selector strings, and then hides all DOM elements matching the passed selectors. The rule only applies on IOs devices for the children of the `easy-popup_overflow` element, if it exists. Otherwise, this parameter has no effect. This might be useful due to known scrolling issues in fixed elements in *Safari*, in that case it is possible to hide all elements inside ***body*** completely for the period of the popup display.

--------------
BASIC METHODS:
--------------

### show (shows the popup):

***As in the case with the popup constructor the parameters are accepted as an object. The object properties are as follows:***

  ***title*** `string`
  
> Popup title (heading).

  ***text*** `string`
  
> Popup text.

  ***btnEvents*** `boolean`
  
> Enable/disable events when clicking buttons `.closing_button` and `.confirm_button`.

  ***name*** `string`
  
> Name of the popup being called (***data-name*** attribute). It defaults to ***message***.

  ***html*** `string`
  
> Apply an HTML template if passed (in this case parameters ***title***, ***text*** and ***name*** are ignored).

  ***closerCallback*** `function | object`
  
> Callback triggered when clicking on `.closer`. If it is an object then two properties are accepted: `closerOff` (if you need to disable popup auto closing set this to `true`) and `callback` (the passed callback itself that will be triggered when closing)

  ***closingBtnCallback*** `function`
  
> If you need to attach a separate callback to `.closing_button` - pass it here (if passed, it will replace the default one).

  ***confirmBtnCallback*** `function`
  
> If you need to attach a separate callback to `.confirm_button` - pass it here (if passed, it will replace the default one).

  ***backgroundClickCallback*** `function`
  
> If you need a separate callback for the click on `.tint` (background) - pass it here.

  ***callbackOnEsc*** `function`
  
> If you need a separate callback for ***Esc*** keypress - pass it here.

  ***callbackOnEnter*** `function`
  
> If you need a separate callback for ***Enter*** keypress - pass it here.

  ***closingBtnText*** `string`
  
> Set you own text for the closing button `.closing_button` (accepts HTML).

  ***confirmBtnText*** `string`
  
> Set you own text for the confirmation button `.confirm_button` (accepts HTML).

  ***animationShow*** `string`
  
> Name of the css animation (as defined in @keyframes) used for opening this specific popup, i.e. once only. If this parameter is not passed the default popup opening animation is used.

  ***animationClose*** `string`
  
> Name of the css animation (as defined in @keyframes) used for animation of the previously opened popup, i.e. once only. Comment: if the current popup is called when having previously opened but yet not closed ones, then the old popup is replaced with the current one, and in this case the old one will be closed with the animation passed to this parameter. If this parameter is not passed the default popup closing animation is used.

***speed*** `number`
  
> Popup opening speed. It defaults to *false*. In case it is set to *false* the popup object speed property is used instead.

***closingSpeed*** `number`
  
> Closing speed of the previously opened popup. It defaults to *false*. In case it is set to *false* the popup object speed property is used instead.

-----------------------------------
### close (closes the popup):

***The parameters are accepted as an object. The object properties are as follows:***

***callback*** `function`
  
> Callback to be executed before popup closing.

***stopAfterCallback*** `boolean`
  
> If set to *true* the script is stopped after triggering the callback. If not passed, then by default the popup will close after triggering the callback.

***animationClose*** `string`
  
> Name of the css animation (as defined in @keyframes) used for closing this specific popup, i.e. once only. If this parameter is not passed the default popup closing animation is used.

***speed*** `number`
  
> Popup closing speed. It defaults to *false*. In case it is set to *false* the popup object speed property is used instead.

-----------------------------------
### setLoading (shows a fullscreen loading indicator above all other contents):

***Two parameters are accepted:***

  `number`
  
> Minimal time during which the loading animation (or image) should be displayed.

  `string`
  
> URL of the animation or image that should be displayed as a loading indicator. Passing a string in *base64* is supported.

-----------------------------------
### unsetLoading (hides the loading indicator displayed by the "setLoading" method):

***Used without passing parameters***

-----------
USE EXAMPLE
-----------
For an example of popup use see folder ***test***.

-------------------------------
VERSIOIN-RELATED CHANGE HISTORY
-------------------------------
All change logs can be found in [CHANGELOG.md](CHANGELOG.md).