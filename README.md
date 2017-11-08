[![Travis](https://travis-ci.org/danziamo/fontometer.svg?branch=master)](https://travis-ci.org/danziamo/fontometer)
[![appVeyor](https://ci.appveyor.com/api/projects/status/3nrnff2hm6g2v9ph?svg=true)](https://ci.appveyor.com/project/danziamo/fontometer)
[![Coverage Status](https://coveralls.io/repos/github/danziamo/fontometer/badge.svg?branch=master)](https://coveralls.io/github/danziamo/fontometer?branch=master)
[![dependencies Status](https://david-dm.org/danziamo/fontometer/status.svg)](https://david-dm.org/danziamo/fontometer)

# Fontometer

Tool to measure font's character width, height and descent


### Usage
To use tool go to this link [fontometer](https://danziamo.github.io/fontometer/)

or install it on your computer and run it

```
git clone https://github.com/danziamo/fontometer.git
npm run build
npm run serve
```


## Description

`fontometer` allows use to measure [Google Font](https://fonts.google.com/) text.
This tool generates a javascript file with export module name as a font name.
Each exports return javascript function returns height, width and descent of a given text

## How to use
You can specify one or several font names using `|` as a delimiter
After some time fonotometer will apply this font and you can see how it looks like
![Normal view](/media/demo.gif)
By pressing `Not feelink lucky` button it will generate Javascript file with functions as Font names. Each function name has a measurement for default ASCII symbols. You can download either normal or minified version

Example of downloaded fonts.js
```js
exports['IndieFlower'] = function () {
    ...
    return function (fontSize) {
        ...
        return {
                getHeight: function () {
                    return ratio * height;
                },
                getDescent: function () {
                    return ratio * descent;
                },
                getWidth: getWidth
        };
    }
}
exports['StalinistOne'] = function () {
    ...
    return function (fontSize) {
        ...
        return {
                getHeight: function () {
                    return ratio * height;
                },
                getDescent: function () {
                    return ratio * descent;
                },
                getWidth: getWidth
        };
    }
}
```
After that you can require fonts measurements
```js
const fontMeasureStalinist = require('./fonts').StalinistOne();
const fontMeasureIndie = require('./fonts').IndieFlower();

const fontSize = 32;
const text = 'Hello World!';
const fms = fontMeasureStalinist(fontSize);
console.log(fms.getWidth(text), fms.getHeight(), fms.getDescent());
```
`getWidth` returns width of a given text
`getHeight` returns the height of the biggest character in a font
`getDescent` returns the height of the biggest descent of a character in a font
