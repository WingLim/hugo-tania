const removeEl = (el: Element) => {
    if (!el) return;
    el.remove ? el.remove() : el.parentNode.removeChild(el);
};

const insertAfter = (target: HTMLElement, sib: Element) => {
    target.after ? target.after(sib) : (
        target.parentNode.insertBefore(sib, target.nextSibling)
    );
};

const insideOut = (el: Element) => {
    var p = el.parentNode as HTMLElement, 
        x = el.innerHTML,
        c = document.createElement('div');  // a tmp container
    insertAfter(p, c);
    c.appendChild(el);
    el.innerHTML = '';
    el.appendChild(p);
    p.innerHTML = x;  // let the original parent have the content of its child
    insertAfter(c, c.firstElementChild);
    removeEl(c);
};

export let renderFootnotes = function () {
    document.querySelectorAll('.footnotes > ol > li[id^="fn"], #refs > div[id^="ref-"]').forEach(function (fn) {
        let a = document.querySelectorAll('a[href="#' + fn.id + '"]');
        if (a.length === 0) return;
        a.forEach(function (el) { el.removeAttribute('href') });
        let newA = a[0] as HTMLElement;
        let side = document.createElement('div');
        side.className = 'side side-right';
        if (/^fn/.test(fn.id)) {
            side.innerHTML = fn.innerHTML;
            var number = newA.innerHTML;   // footnote number
            side.firstElementChild.innerHTML = '<span class="bg-number">' + number +
                '</span> ' + side.firstElementChild.innerHTML;
            removeEl(side.querySelector('a[href^="#fnref"]'));  // remove backreference
            let newAParent = newA.parentNode as HTMLElement
            newAParent.tagName === 'SUP' && insideOut(newA);
        } else {
            side.innerHTML = fn.outerHTML;
            newA = newA.parentNode as HTMLElement;
        }
        insertAfter(newA, side);
        newA.classList.add('note-ref');
        removeEl(fn);
    })
    document.querySelectorAll('.footnotes, #refs').forEach(function (fn) {
        var items = fn.children;
        if (fn.id === 'refs') return items.length === 0 && removeEl(fn);
        // there must be a <hr> and an <ol> left
        if (items.length !== 2 || items[0].tagName !== 'HR' || items[1].tagName !== 'OL') return;
        items[1].childElementCount === 0 && removeEl(fn);
    });
};
