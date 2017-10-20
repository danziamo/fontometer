'use strict';

const ast = require('./ast-gen.js')
    , domUtil = require('./dom-util.js')
    , fu = require('./font-util.js')
    ;

module.exports = function(document, family) {
    const dom = domUtil(document, family);
    const svgGen = dom.createSvg(document, family);
    const svg = svgGen.svg;
    const tw = svgGen.tw;
    const baseSize = fu.getBaseSize(tw);
    const gt = fu.genTable(tw, baseSize);
    const height = gt.height;
    const table = gt.table;
    const def = gt.default;
    dom.removeSvg(svg);

    const constants = {
        baseSize: baseSize,
        height: height,
        magicRatio: .35,
        default: def,
        table: table
    };

    dom.download(ast(constants), family);
};
