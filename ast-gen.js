'use strict';

const esprima = require('esprima')
    , escodegen = require('escodegen')
    , f = require('./ast-descriptor')
    ;

const getVdr = (key, value) => {
    return f.vdr(f.id(key), f.lit(value));
};

const initVar = (cst) => {
    return f.vds([
        f.vdr(
            f.id('table'),
            f.oe(
                Object.keys(cst.table).sort( (a, b) => a - 0 - (b - 0)).reduce((acc, e) => {
                    return acc
                        .concat(f.pr(
                            f.lit(e),
                            f.lit(cst.table[e])
                            // f.oe(
                            //     Object.keys(cst.table[e]).reduce((accr, er) => {
                            //         return accr.concat(f.pr(f.lit(er), f.lit(1)));
                            //     }, [])
                            // )
                        ));
                }, [])
            )
        ),
        getVdr('baseSize', cst.baseSize),
        getVdr('height', cst.height),
        getVdr('descent', cst.height*cst.magicRatio),
        getVdr('defaultWidth', cst.default)
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

const genWidth = () => {
    var script = 'const getWidth = (str) => { return str.split("").reduce( (acc, e) => acc + (table[e] || defaultWidth)*ratio, 0); };';
    return esprima.parseScript(script).body[0];
};



module.exports = (cst) => {
    const ast = f.p([
        f.es(
            f.ae('=',
                f.me(f.id('module'), f.id('exports')),
                f.fe(
                    [],
                    f.bs([
                        initVar(cst),
                        f.rs(
                            f.fe(
                                [f.id('fontSize')],
                                f.bs([
                                    f.vds([f.vdr(f.id('ratio'), f.be('/', f.id('fontSize'), f.id('baseSize')))], 'var'),
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
                        )
                    ])
                )
            )
        )
    ]);
    return escodegen.generate(ast);
};
