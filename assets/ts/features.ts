import ThemeColorScheme from "ts/colorScheme"
import { renderCopyButton } from "ts/copyButton"
import { renderFootnotes } from "ts/footnotes"

let enableFootnotes = false
if (document.currentScript) {
    enableFootnotes = document.currentScript.dataset.enableFootnotes == 'true'
}

const init = () => {
    new ThemeColorScheme(document.getElementById('dark-mode-button'))
    if (enableFootnotes) {
        renderFootnotes()
    }
    renderCopyButton()
}

window.addEventListener('load', () => {
    setTimeout(function () {
        init()
    }, 0)
})
