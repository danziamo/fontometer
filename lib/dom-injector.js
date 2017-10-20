'use strict';

const fu = require('./font-util');

module.exports = (document, family) => {
    if (document.getElementsByTagName('link').length !== 0)
        document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('link')[0]);

    const link = 'https://fonts.googleapis.com/css?family=' + family;
    var el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', link);
    document.getElementsByTagName('head')[0].appendChild(el);
    document.getElementsByTagName('style')[0].innerHTML = 'body * { font-family: ' + fu.formatFont(family) + ', Roboto; font-size: 48px;}';
};
