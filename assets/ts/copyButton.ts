// This file is copy from https://github.com/CaiJimmy/hugo-theme-stack/blob/c1fcec95a64c6787cd08ed9f5194306642058b7a/assets/ts/main.ts#L65-L92
// All right reserved by Jimmy Cai

const highlights = document.querySelectorAll('.article-post div.highlight');
const copyText = `Copy`,
    copiedText = `Copied!`;

export let renderCopyButton = function() {
    highlights.forEach(highlight => {
        const copyButton = document.createElement('button')
        copyButton.innerHTML = copyText
        copyButton.classList.add('copyCodeButton');
        highlight.appendChild(copyButton);

        const codeBlock = highlight.querySelector('code[data-lang]');
        if (!codeBlock) return;

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(codeBlock.textContent)
                .then(() => {
                    copyButton.textContent = copiedText;

                    setTimeout(() => {
                        copyButton.textContent = copyText;
                    }, 1000);
                })
                .catch(err => {
                    alert(err)
                    console.log('Something went wrong', err);
                });
        });
    });
}
