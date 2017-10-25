'use strict';

const ast = require('./ast-gen.js')
    , domUtil = require('./dom-util.js')
    , fu = require('./font-util.js')
    ;

module.exports = function(document, props) {
    const dom = domUtil(document);
    const cst = Object.keys(props).reduce( (acc, family) => {
        const svgGen = dom.createSvg(family);
        const svg = svgGen.svg;
        const tw = svgGen.tw;
        const baseSize = fu.getBaseSize(tw);
        const gt = fu.genTable(tw, baseSize);

        dom.removeSvg(svg);

        acc[family] = Object.assign({baseSize: baseSize, magicRatio: .35}, gt);
        return acc;

    }, {});

    const content = ast(cst);
    dom.attachStrButton('btnDownload', 'fonts', content.normal);
    dom.attachStrButton('btnDownloadMin', 'fonts.min', content.minified);
};
