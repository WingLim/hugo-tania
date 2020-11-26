var removeEl = function (el) {
    if (!el) return;
    el.remove ? el.remove() : el.parentNode.removeChild(el);
};

var insertAfter = function (target, sib) {
    target.after ? target.after(sib) : (
        target.parentNode.insertBefore(sib, target.nextSibling)
    );
};

var insideOut = function (el) {
    var p = el.parentNode, x = el.innerHTML,
        c = document.createElement('div');  // a tmp container
    insertAfter(p, c);
    c.appendChild(el);
    el.innerHTML = '';
    el.appendChild(p);
    p.innerHTML = x;  // let the original parent have the content of its child
    insertAfter(c, c.firstElementChild);
    removeEl(c);
}

d = document;
d.querySelectorAll('.footnotes > ol > li[id^="fn"], #refs > div[id^="ref-"]').forEach(function (fn) {
    a = d.querySelectorAll('a[href="#' + fn.id + '"]');
    if (a.length === 0) return;
    a.forEach(function (el) { el.removeAttribute('href') });
    a = a[0];
    s = d.createElement('div');
    s.className = 'side side-right';
    if (/^fn/.test(fn.id)) {
        s.innerHTML = fn.innerHTML;
        var n = a.innerText;   // footnote number
        s.firstElementChild.innerHTML = '<span class="bg-number">' + n +
            '</span> ' + s.firstElementChild.innerHTML;
        removeEl(s.querySelector('a[href^="#fnref"]'));  // remove backreference
        a.parentNode.tagName === 'SUP' && insideOut(a);
    } else {
        s.innerHTML = fn.outerHTML;
        a = a.parentNode;
    }
    insertAfter(a, s);
    a.classList.add('note-ref');
    removeEl(fn);
})
d.querySelectorAll('.footnotes, #refs').forEach(function (fn) {
    var items = fn.children;
    if (fn.id === 'refs') return items.length === 0 && removeEl(fn);
    // there must be a <hr> and an <ol> left
    if (items.length !== 2 || items[0].tagName !== 'HR' || items[1].tagName !== 'OL') return;
    items[1].childElementCount === 0 && removeEl(fn);
});