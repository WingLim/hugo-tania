import ThemeColorScheme from "ts/colorScheme"
import { renderCopyButton } from "ts/copyButton"
import { renderFootnotes } from "ts/footnotes"

let enableFootnotes = false
let enableLineNos = false
if (document.currentScript) {
    enableFootnotes = document.currentScript.dataset.enableFootnotes == 'true'
    enableLineNos = document.currentScript.dataset.enableLinenos == 'true'
}

const init = () => {
    new ThemeColorScheme(document.getElementById('dark-mode-button'))
    if (enableFootnotes) {
        renderFootnotes()
    }
    renderCopyButton(enableLineNos)
}

window.addEventListener('load', () => {
    setTimeout(function () {
        init()
    }, 0)
})
