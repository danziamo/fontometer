'use strict';

const esprima = require('esprima')
    , escodegen = require('escodegen')
    , f = require('./ast-descriptor')
    ;

const minifiedOptions = {
    format: {
        indent: {
            style: ''
        },
        space: '',
        newline: ''
    }
};

const getVdr = (key, value) => {
    return f.vdr(f.id(key), f.lit(value));
};

const initVar = (cst) => {
    return f.vds([
        f.vdr(
            f.id('table'),
            f.are(cst.table.map(e => f.lit(e)))
        ),
        getVdr('baseSize', cst.baseSize),
        getVdr('height', cst.height),
        getVdr('descent', cst.height*cst.magicRatio),
        getVdr('defaultWidth', cst.default),
        cst.regex && f.vdr(f.id('re'), f.ne(f.id('RegExp'), [f.lit(cst.regex)]))
    ], 'const');

};

const genGetHeight = () => {
    return f.pr(
        f.id('getHeight'),
        f.fe(
            [],
            f.bs([f.rs(f.be('*', f.id('ratio'), f.id('height')))])
        )
    );
};

const genGetDescent = () => {
    return f.pr(
        f.id('getDescent'),
        f.fe(
            [],
            f.bs([f.rs(f.be('*', f.id('ratio'), f.id('descent')))])
        )
    );
};

const genGetWidth = () => {
    return f.pr(
        f.id('getWidth'), f.id('getWidth')
    );
};

const genMatchWidth = () => {
    let script = 'const getIndex = (ch) => { const m = ch.match(re);' +
        'if (m !== null)' +
        'for (let i = 0; i < table.length; i += 1)' +
        'if (m[i + 1] !== undefined) return i;};';
    return esprima.parseScript(script).body[0];
};

const genWidth = () => {
    var script = 'const getWidth = (str) => { return str.split("").reduce( (acc, e) => acc + (table[getIndex(e)] || defaultWidth)*ratio, 0); };';
    return esprima.parseScript(script).body[0];
};

const genReturnStatement = () => {
    return f.rs(
        f.fe(
            [f.id('fontSize')],
            f.bs([
                f.vds([
                    f.vdr(
                        f.id('ratio'),
                        f.be('/', f.id('fontSize'), f.id('baseSize'))
                    )
                ], 'const'),
                genMatchWidth(),
                genWidth(),
                f.rs(
                    f.oe([
                        genGetHeight('height'),
                        genGetDescent('descent'),
                        genGetWidth('width')
                    ])
                )
            ])
        )
    );
};

module.exports = (cst) => {
    const ast = f.p(
        Object.keys(cst).reduce( (acc, e) => {
            return acc.concat(
                f.es(
                    f.ae('=',
                        f.me(f.id('exports'), f.lit(e.match('\'(.*?)\'')[1]), true),
                        f.fe(
                            [],
                            f.bs([
                                initVar(cst[e]),
                                genReturnStatement(cst[e])
                            ])
                        )
                    )
                )
            );
        }, [])
    );
    return {
        normal: escodegen.generate(ast, {}),
        minified: escodegen.generate(ast, minifiedOptions)
    };
};
