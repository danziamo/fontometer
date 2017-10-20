'use strict';

module.exports = () => {
    const getBaseSize = (tw) => {
        let r = {};
        let k = 0;
        let baseSize = 288;
        for (let f = 9; f <= 288; f+= 1) {
            let int = 0;
            let rat = 0;
            r[f] = new Set();
            for (let c = 33; c < 127; c += 1) {
                const chw = tw(String.fromCharCode(c), f).w;
                if (Number.isInteger(chw)) int += 1;
                else rat += 1;
                r[f].add(chw);
            }
            if (int/rat > k) {
                k = int/rat;
                baseSize = f;
            }
        }
        // console.log(r);
        return baseSize;
    };

    const genTable = (tw, bs) => {
        let lst = 100;
        let mst = 0;
        let minHeight = 1000;
        let maxHeight = 0;
        let res = {};
        for (let c = 33; c < 127; c += 1) {
            const ch = String.fromCharCode(c);
            const chs = tw(ch, bs);
            if (chs.w < lst) lst = chs.w;
            if (chs.w > mst) mst = chs.w;
            if (chs.h < minHeight) minHeight = chs.h;
            if (chs.h > maxHeight) maxHeight = chs.h;
            // if (res[chs.w] === undefined) {
            //     res[chs.w] = {};
            // }
            // res[chs.w][ch] = 1;
            res[ch] = chs.w;
        }

        return {
            table: res,
            height: maxHeight,
            default: (3 * mst + lst)/4
        };
    };

    return {
        getBaseSize: getBaseSize,
        genTable: genTable
    };
};
