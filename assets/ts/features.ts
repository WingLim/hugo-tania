import ThemeColorScheme from "./colorScheme"
import { renderCopyButton } from "./copyButton"
import { renderFootnotes } from "./footnotes"

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
