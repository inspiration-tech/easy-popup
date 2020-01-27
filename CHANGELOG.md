# Changelog
All notable changes to this project will be documented in this file.   
*Note*: early versions might not correspond to the commonly-accepted semantic versioning system.

Changelog in other languages:  
[Russian](CHANGELOG.ru.md)

## [3.2.2] - 2019-09-04
### Изменено
- Fixed the undefined ***popupCloser*** variable error.

## [3.2.1] - 2019-09-04
### Changed
- Fixed the ***localFunctions*** error in the module version.

## [3.2.0] - 2019-09-03
### Added
- Added the ***hideOnIos*** parameter to the popup constructor. It hides custom DOM elements (see the popup constructor parameter list).

### Changed
- The `easy-popup_overflow` class is now added to the ***body*** and ***html*** elements in IOs devices as well. These elements also get the `easy-popup_ios` class in OIs devices if the ***hideOnIos*** parameter is set and valid.

## [3.1.1] - 2019-09-02
### Changed
- Fixed the popup speed error in the module version.

## [3.1.0] - 2019-09-02
### Added
- Showing and closing speed parameters added to the ***show*** and ***close*** methods (see the ***speed*** and ***closingSpeed*** parameters in the ***show*** method, and the ***speed*** parameter in the ***close*** method).

## [3.0.7] - 2019-08-30
### Changed
- Fixed the bug with the ***minLoadingTime*** parameter. Now it can be set to ***0*** without additional timeout.
- The ***unsetLoading*** method does not return *false* anymore, but returns the popup object instead.
- ***Babel Polyfill*** moved from ***optionalDependencies*** to ***devDependencies***.

## [3.0.6] - 2019-07-17
### Changed
- The ***data-id*** attribute of the `.easy-popup-tint` element removed from the styles.

## [3.0.5] - 2019-07-06
### Added
- CHANGELOG.md was added. All version change descriptions were moved from README.md to CHANGELOG.md.

## [3.0.4] - 2019-07-06
### Added
- Information on composer installation was added, the package was also updated for use as an npm-asset in Composer.

## [3.0.3] - 2019-07-06
### Added
- The English version of *README* was added.

## [3.0.2] - 2019-07-02
### Changed
- A minor bug of script style correspondence to the css file styles was fixed.

## [3.0.1] - 2019-06-28
### Changed
- IOS styling bug during the popup scroll was fixed. (Previously the popup did not scroll when touching on inputs.) 

## [3.0.0] - 2019-06-25
### Added
- Module-based script import support was added (see import details above).
- The animation principle changed. Now css-based animation is used (***@keyframes***). The script contains a default animation, but also accepts user animations. The default animation can be changed in the constructor, but also it is possible to pass animations for specific opening/closing operations to the ***show*** and ***close*** methods. See details for its use above.
- The `.easy-popup-tint` element (previously `.simple-popup-tint`) is now given the ***data-id*** attribute containing the unique popup object identifier. This attribute is assigned each time when creating a new popup instance (except for the cases when the target parent element (***appendTo***) already has the `.easy-popup-tint` element with the ***data-id*** attribute). The ***id*** parameter was added to the constructor which allows to set the identifier manually. If this parameter is not passed, then by default a random identifier is generated.

### Changed 
- The package was renamed from ***simple-popup*** to ***easy-popup*** as at the moment of publication the name ***simple-popup*** was already taken in ***npm***. Respectively, the popup object name was changed from ***SimplePopup*** to ***EasyPopup***, and also the prefixes in the css classes were changed from ***simple-popup*** to ***easy-popup***.
- ***jQuery*** was removed from the list of dependencies. Only native js is used in the script now.
- Event callbacks fixed.
- Three constructor methods renamed according to their semantically intended purpose:   
    `closeOnBackgroundClick` -> `allowBackgroundCallback`   
    `closeOnEsc` -> `allowCallbackOnEsc`   
    `confirmOnEnter` -> `allowCallbackOnEnter`   
- The default loading picture (***loadingPic***) was replaced with a more lightweight one for optimization purposes. If you need to use the previous one, it can be done in the parameters. The old picture is in the *img* folder (`loading.gif`).

## [2.2.0] - 2019-06-19
### Added
- The ***appendTo*** parameter was added to the constructor, accepting the selector to append the script html code to.
- The ***noScrollTop*** parameter was added to the constructor, forbidding popup auto scrolling.

## [2.1.0] - 2019-05-20
### Added
- It is now possible to pass the ***name*** parameter as *false* in the ***show*** method, in this case there will be no active popup container (for example, it is useful when using the ***setLoading*** method).

## [2.0.1] - 2019-03-28
### Changed
- The ***simple-popup_overflow*** class is now not assigned when using ios devices

## [2.0.0] - 2019-02-19
### Added
- Methods ***setLoading*** and ***unsetLoading*** were added, used to show/hide the fullscreen loading indicator (see detailed description above in the method list).
- The ***minLoadingTime*** parameter was added to the popup constructor, used to set the minimal time during which the loading animation (or image) should be displayed, and also the ***loadingPic*** parameter which is the URL of the image that will be used as the loading indicator.

### Changed
- Main popup CSS classes were renamed:   
    `.tint` -> `.simple-popup-tint`   
    `.popup` -> `.simple-popup`   
    `.heading` -> `.simple-popup__heading`   
    `.body` -> `.simple-popup__body`   
    `.text` -> `.simple-popup__text`   
    `.closer` -> `.simple-popup__closer`   
    `.h_overflow` -> `.simple-popup_overflow`   
- The popup object was renamed from ***Popup*** to ***SimplePopup***.
- All methods of the ***SimplePopup*** object now return this very object.

### Removed 
- The ***scrollTop*** property was removed from the constructor as it must be modified by special handlers only.

## [1.3.4] - 2019-02-08
### Added
- The ***h_overflow*** class used when dynamically creating css styles via js was also added to the css files.
- The ***isActive*** property was added to the ***Popup*** object, it is set to *true* if a popup is open, and *false* if not.

### Changed
- The last scroll position is stored only if the popup is closed, and if it is open the stored value is used.

## [1.3.3] - 2019-01-14
### Changed
- A scrolling bug after popup opening was fixed

## [1.3.2] - 2018-09-28
### Changed
- The ***closingBtnText*** default parameter was changed (in the `confirm` popup it is now set to **'Отклонить'**, and in the `message` popup it is **'OK'**, in other cases it it set to ***false***). The default parameter works for the two indicated popups only, including the case if ***false*** is passed (by strict comparison).
- The ***confirmBtnText*** default parameter was changed (in the `confirm` popup it is now set to **'Подтвердить'**). The default parameter works for the indicated popup only, including the case if ***false*** is passed (by strict comparison).

## [1.3.1] - 2018-08-16
### Changed
- Addressing the .tint element was changed to body>.tint
- The Popup object was moved to the window scope.

## [1.3.0] - 2018-07-18
### Added
- A folder with default CSS styles was added (not necessary to use)
- The composer.json file was added

### Changed
- Minor style bugs fixed
- Now styles and mediaStyles default to false

### Removed
- Automatic initialization was removed

## [earlier versions] - not logged