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
        const code = pre[1].textContent;

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
