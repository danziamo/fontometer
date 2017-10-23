'use strict';

const ast = require('./ast-gen.js')
    , domUtil = require('./dom-util.js')
    , fu = require('./font-util.js')
    ;

module.exports = function(document, props) {
    const minifiedOptions = {
        format: {
            indent: {
                style: ''
            },
            space: '',
            newline: ''
        }
    };
    const dom = domUtil(document);
    const cst = Object.keys(props).reduce( (acc, family) => {
        const svgGen = dom.createSvg(family);
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

        acc[family] = constants;
        return acc;

    }, {});

    dom.attachStrButton('btnDownload', 'fonts', ast(cst, {}));
    dom.attachStrButton('btnDownloadMin', 'fonts.min', ast(cst, minifiedOptions));
};
