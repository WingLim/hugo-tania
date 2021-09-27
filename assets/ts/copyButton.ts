// This file is copy from https://github.com/CaiJimmy/hugo-theme-stack/blob/24915a912f23e8c0a21aa156714ea7f071469fdb/assets/ts/main.ts#L61-L87
// All right reserved by Jimmy Cai

const codeBlocks = document.querySelectorAll('.article-post .highlight');
const copyText = `Copy`,
    copiedText = `Copied!`;

export let renderCopyButton = function() {
    codeBlocks.forEach(codeBlock => {
        const copyButton = document.createElement('button')
        copyButton.innerHTML = copyText
        copyButton.classList.add('copyCodeButton');
        codeBlock.appendChild(copyButton);

        const pre = codeBlock.getElementsByTagName('pre');
        // This theme's code block has line number, so the second is where the
        // real code locate
        let codeIndex = 0
        if (pre.length == 2) {
            codeIndex = 1
        }
        const code = pre[codeIndex].textContent;

        copyButton.addEventListener('click', () => {
            navigator.clipboard.writeText(code)
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
