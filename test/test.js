'use strict';

const assert = require('assert')
    , fu = require('../lib/font-util')

describe('blanc', function() {

    describe('first', function() {
        assert.equal(1, 1);
    });

    describe('formatFont', function() {
        assert.equal(fu.formatFont('Droid+Sans|Indie+Flower:i|Roboto&subset=cyrillic'), 'Droid Sans, Indie Flower, Roboto');
    });
});
