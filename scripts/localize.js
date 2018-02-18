String.prototype.toPersianDigit = function (e) {
    return this.replace(/\d+/g, function (t) {
        let n = [],
            r = [];
        for (let i = 0; i < t.length; i++) {
            n.push(t.charCodeAt(i))
        }
        for (let s = 0; s < n.length; s++) {
            r.push(String.fromCharCode(n[s] + (!!e && e == true ? 1584 : 1728)))
        }
        return r.join("")
    })
};

let getParentLang = (node) => {
    let defaultLang = 'fa';
    let currLang = null;
    while (currLang === null && node.parentNode) {
        if (node.getAttribute && node.getAttribute('lang')) {
            currLang = node.getAttribute('lang');
        }
        node = node.parentNode;
    }
    return currLang || defaultLang;
};


let TraceNodes = (e) => {
    if (e.nodeType == 3 && getParentLang(e) === 'fa') {
        e.nodeValue = e.nodeValue.toPersianDigit();
    } else {
        for (let t = 0; t < e.childNodes.length; t++) {
            TraceNodes(e.childNodes[t]);
        }
    }
};


export {
    TraceNodes
};