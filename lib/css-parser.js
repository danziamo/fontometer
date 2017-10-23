'use strict';

const postcss = require('postcss');

module.exports = (css) => {
    const processor = postcss();
    const nodes = processor.process(css).result.root.nodes
        .filter(e => e.type === 'atrule')
        .reduce( (acc, e) => {
            const node = e.nodes.filter(item => item.prop === 'font-family')[0];
            if (acc[node.value] === undefined) {
                acc[node.value] = {};
            }
            e.nodes
                .filter(item => item.prop !== 'font-family')
                .forEach( item => {
                    if (item.prop === 'unicode-range') {
                        if (acc[node.value]['unicode-range'] === undefined)
                            acc[node.value]['unicode-range'] = item.value;
                        else
                            acc[node.value]['unicode-range'] += ' ' + item.value;
                    } else {
                        acc[node.value][item.prop] = item.value;
                    }
                });
            return acc;
        }, {});
    return nodes;
};
