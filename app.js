'use strict';

const gen = require('./generator.js');
const domInjector = require('./dom-injector');

window.onload = function() {
    const generate = () => {
        const fontFamily = document.getElementById('family').value;
        gen(document, fontFamily);
    };
    document.getElementById('genButton').onclick = generate;

    var timer;
    document.getElementById('family').onkeyup = (e) => {
        clearTimeout(timer);
        timer = setTimeout(function() {
            domInjector(document, e.target.value);
        }, 600);
    };

};

/* global document window */
