'use strict';

module.exports = (document) => {
    const createSvg = (family) => {
        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        const textEl = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        textEl.style['font-family'] = family.replace(/["']/g, '');
        svg.setAttributeNS(null, 'width', '0');
        svg.setAttributeNS(null, 'height', '0');
        svg.style.visibility = 'hidden';
        document.body.appendChild(svg);
        svg.appendChild(textEl);


        return {
            svg: svg,
            tw: (text, fs) => {
                textEl.style['font-size'] = fs + 'px';
                textEl.textContent = text;
                const bBox = svg.getBBox();
                return {
                    w: bBox.width,
                    h: bBox.height
                };
            }
        };
    };

    const removeSvg = (svg) => {
        document.body.removeChild(svg);
    };

    const attachStrButton = (btnId, fileName, str) => {
        const btn = document.getElementById(btnId);
        btn.innerText = fileName + '.js (' + str.length + ' bytes)';
        btn.onclick = () => download(str, fileName);
    };

    const download = (txt, name) => {
        const elem = document.createElement('a');
        elem.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(txt));
        elem.setAttribute('download', name.toLowerCase().replace(' ', '-')+'.js');
        elem.style.display='none';
        document.body.appendChild(elem);
        elem.click();
        document.body.removeChild(elem);
    };

    return {
        attachStrButton: attachStrButton,
        createSvg: createSvg,
        removeSvg: removeSvg,
        download: download
    };
};
