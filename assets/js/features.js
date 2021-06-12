let show = function (elem) {
    elem.style.display = 'block';
};
let hide = function (elem) {
    elem.style.display = 'none';
};

(function (d) {
    let enableFootnotes = false
    if (d.currentScript) {
        enableFootnotes = d.currentScript.dataset['enableFootnotes'] == 'true'
    }
    renderFootnotes = function () {
        const removeEl = (el) => {
            if (!el) return;
            el.remove ? el.remove() : el.parentNode.removeChild(el);
        };

        const insertAfter = (target, sib) => {
            target.after ? target.after(sib) : (
                target.parentNode.insertBefore(sib, target.nextSibling)
            );
        };

        const insideOut = (el) => {
            var p = el.parentNode, x = el.innerHTML,
                c = document.createElement('div');  // a tmp container
            insertAfter(p, c);
            c.appendChild(el);
            el.innerHTML = '';
            el.appendChild(p);
            p.innerHTML = x;  // let the original parent have the content of its child
            insertAfter(c, c.firstElementChild);
            removeEl(c);
        };

        document.querySelectorAll('.footnotes > ol > li[id^="fn"], #refs > div[id^="ref-"]').forEach(function (fn) {
            a = document.querySelectorAll('a[href="#' + fn.id + '"]');
            if (a.length === 0) return;
            a.forEach(function (el) { el.removeAttribute('href') });
            a = a[0];
            side = document.createElement('div');
            side.className = 'side side-right';
            if (/^fn/.test(fn.id)) {
                side.innerHTML = fn.innerHTML;
                var number = a.innerText;   // footnote number
                side.firstElementChild.innerHTML = '<span class="bg-number">' + number +
                    '</span> ' + side.firstElementChild.innerHTML;
                removeEl(side.querySelector('a[href^="#fnref"]'));  // remove backreference
                a.parentNode.tagName === 'SUP' && insideOut(a);
            } else {
                side.innerHTML = fn.outerHTML;
                a = a.parentNode;
            }
            insertAfter(a, side);
            a.classList.add('note-ref');
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
    if (enableFootnotes) {
        renderFootnotes()
    }
})(document);

renderAnchor = function () {
    for (let num = 1; num <= 6; num++) {
        // search h1-h6
        const headers = document.querySelectorAll('.article-post>h' + num);
        for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            // add anchor before h1-h6
            header.innerHTML = `<a href="#${header.id}" class="anchor"><svg class="icon" aria-hidden="true" focusable="false" height="16" version="1.1" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"></path></svg></a>${header.innerHTML}`;
        }
    }
}();

switchDarkMode = function () {
    const rootElement = document.documentElement; // <html>
    const darkModeStorageKey = 'user-color-scheme'; // use as localStorage's key
    const rootElementDarkModeAttributeName = 'data-user-color-scheme';
    const darkModeTogglebuttonElement = document.getElementById('dark-mode-button');

    const setLS = (k, v) => {
        try {
            localStorage.setItem(k, v);
        } catch (e) { }
    }

    const removeLS = (k) => {
        try {
            localStorage.removeItem(k);
        } catch (e) { }
    }

    const getLS = (k) => {
        try {
            return localStorage.getItem(k);
        } catch (e) {
            return null // the same as localStorage.getItem() get nothing
        }
    }

    const getModeFromCSSMediaQuery = () => {
        // use matchMedia API
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    const resetRootDarkModeAttributeAndLS = () => {
        rootElement.removeAttribute(rootElementDarkModeAttributeName);
        removeLS(darkModeStorageKey);
    }

    const validColorModeKeys = {
        'dark': true,
        'light': true
    }

    const modeIcons = {
        'dark': '☀️',
        'light': '🌙'
    }

    const setModeButtonIcon = (mode) => {
        darkModeTogglebuttonElement.innerHTML = modeIcons[mode]
    }

    const applyCustomDarkModeSettings = (mode) => {
        // receive user's operation or get previous mode from localStorage
        const currentSetting = mode || getLS(darkModeStorageKey);

        if (currentSetting === getModeFromCSSMediaQuery()) {
            // When the user selected mode equal prefers-color-scheme 
            // reset and restored to automatic mode
            nowMode = getModeFromCSSMediaQuery()
            resetRootDarkModeAttributeAndLS();
        } else if (validColorModeKeys[currentSetting]) {
            nowMode = currentSetting
            rootElement.setAttribute(rootElementDarkModeAttributeName, currentSetting);
        } else {
            // 首次访问或从未使用过开关、localStorage 中没有存储的值，currentSetting 是 null
            // 或者 localStorage 被篡改，currentSetting 不是合法值
            nowMode = getModeFromCSSMediaQuery()
            resetRootDarkModeAttributeAndLS();
        }
        setModeButtonIcon(nowMode)
    }

    const invertDarkModeObj = {
        'dark': 'light',
        'light': 'dark'
    }

    const toggleCustomDarkMode = () => {
        let currentSetting = getLS(darkModeStorageKey);

        if (validColorModeKeys[currentSetting]) {
            // get mode from localStorage and set the opposite
            currentSetting = invertDarkModeObj[currentSetting];
        } else if (currentSetting === null) {
            // if get null from localStorage
            // get mode from prefers-color-scheme and set the opposite
            currentSetting = invertDarkModeObj[getModeFromCSSMediaQuery()];
        } else {
            // get anything error, return
            return;
        }
        // set opposite mode into localStorage
        setLS(darkModeStorageKey, currentSetting);

        return currentSetting;
    }

    // when page loaded set page mode
    applyCustomDarkModeSettings();

    darkModeTogglebuttonElement.addEventListener('click', () => {
        // handle user click switch dark mode button
        applyCustomDarkModeSettings(toggleCustomDarkMode());
    })
}();

initFuse = function () {
    const fuseOptions = {
        shouldSort: true,
        includeMatches: true,
        threshold: 0.0,
        tokenize: true,
        location: 0,
        distance: 100,
        maxPatternLength: 32,
        minMatchCharLength: 1,
        keys: [
            { name: "title", weight: 0.8 },
            { name: "contents", weight: 0.5 },
            { name: "tags", weight: 0.3 },
            { name: "categories", weight: 0.3 }
        ]
    };

    fetch('/index.json')
    .then(function (response) {
        if (response.status !== 200) {
            console.error('[' + response.status + ']Error:', response.statusText);
            return;
        }
        response.json().then(function (pages) {
            let fuse = new Fuse(pages, fuseOptions);
            window.fuse = fuse;
        })
        
    })
    .catch(function (err) {
        console.error('[Fetch]Error:', err);
    });
}()

const searchInput = document.getElementById('search-query');
const searchResults = document.getElementById('search-results')
const articles = document.getElementById('articles')
searchInput.addEventListener("input", function () {
    let value = searchInput.value
    executeSearch(value);
})

executeSearch = function(value) {
    if (value.length != 0) {
        hide(articles)
        show(searchResults)
    } else {
        hide(searchResults)
        show(articles)
    }

    var result = fuse.search(value);
    if (result.length > 0) {
        populateResults(result);
    } else {
        searchResults.innerHTML = '<p class=\"search-results-empty\">Sorry, nothing matched that search.</p>';
    }

    function populateResults(results) {

        // pull template from hugo template definition
        let templateDefinition = document.getElementById("search-result-template").innerHTML;

        searchResults.innerHTML = ""

        results.forEach(function (value) {

            let output = render(templateDefinition, {
                title: value.item.title,
                link: value.item.permalink,
                date: value.item.date,
            });
            searchResults.innerHTML += output;
        });
    }

    function render(templateString, data) {
        let conditionalMatches, conditionalPattern, copy;
        conditionalPattern = /\$\{\s*isset ([a-zA-Z]*) \s*\}(.*)\$\{\s*end\s*}/g;
        //since loop below depends on re.lastInxdex, we use a copy to capture any manipulations whilst inside the loop
        copy = templateString;
        while ((conditionalMatches = conditionalPattern.exec(templateString)) !== null) {
            if (data[conditionalMatches[1]]) {
                //valid key, remove conditionals, leave contents.
                copy = copy.replace(conditionalMatches[0], conditionalMatches[2]);
            } else {
                //not valid, remove entire section
                copy = copy.replace(conditionalMatches[0], '');
            }
        }
        templateString = copy;
        //now any conditionals removed we can do simple substitution
        let key, find, re;
        for (key in data) {
            find = '\\$\\{\\s*' + key + '\\s*\\}';
            re = new RegExp(find, 'g');
            templateString = templateString.replace(re, data[key]);
        }
        return templateString;
    }
}
