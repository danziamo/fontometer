'use strict';

const capitalizePlus = (str) => {
    return str.split(' ').map(e => e.charAt(0).toUpperCase() + e.slice(1)).join('+');
};

module.exports = (document, family) => {
    if (document.getElementsByTagName('link').length !== 0)
        document.getElementsByTagName('head')[0].removeChild(document.getElementsByTagName('link')[0]);

    const link = 'https://fonts.googleapis.com/css?family=' + capitalizePlus(family || 'Roboto');
    var el = document.createElement('link');
    el.setAttribute('rel', 'stylesheet');
    el.setAttribute('href', link);
    document.getElementsByTagName('head')[0].appendChild(el);
    document.getElementsByTagName('style')[0].innerHTML = 'body * { font-family: ' + family + '}';
};
