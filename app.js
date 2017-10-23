'use strict';

const gen = require('./lib/generator.js');
const domInjector = require('./lib/dom-injector');
const pr = require('./lib/css-parser');

window.onload = function() {
    let cssProps = {};
    const generate = () => {
        gen(document, cssProps);
    };
    document.getElementById('genButton').onclick = generate;

    var timer;
    document.getElementById('family').onkeyup = (e) => {
        clearTimeout(timer);
        timer = setTimeout(function() {
            const link = 'https://fonts.googleapis.com/css?family=' + e.target.value;

            const httpRequest = new XMLHttpRequest();
            httpRequest.onreadystatechange = function() {
                if (this.readyState === 4 && this.status === 200) {
                    cssProps = pr(this.responseText);
                    domInjector(document, e.target.value, link, cssProps);
                    // console.log(cssProps);
                }
            }
            httpRequest.open('GET', link, true);
            httpRequest.send();
        }, 600);
    };

};

/* global document window */
