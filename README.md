# Hugo Theme Tania

[![Netlify Status](https://api.netlify.com/api/v1/badges/bae5db51-7cc6-41e2-9615-029ade8aa264/deploy-status)](https://app.netlify.com/sites/hugo-tania/deploys)

A simple theme for bloggers.

[Documentation](https://github.com/WingLim/hugo-tania/wiki)

## Demo

[Example Site](https://hugo-tania.netlify.app/)

## Introduction

Most of the styles for this theme come from [taniarascia.com](https://github.com/taniarascia/taniarascia.com)

I like it's style, so I transplant it to Hugo.

And is that why this theme called Tania.

Thank Tania Rascia again.

## Requirements

It's necessary to use **Hugo ≥ 0.78.0**.

Use Hugo Extended version (recommended) if you want to:

- Use the latest feature/fix from main branch
- Edit SCSS files

## Features

- Responsive and Mobile-Friendly
- Dark mode(It can switch automatically or manually)
- Footnotes(Float on the right side)
- Search with categories filter

## Installation

`cd` into your site's root dir.

1. Add `hugo-tania` theme as submodule.

```bash
git submodule add https://github.com/WingLim/hugo-tania themes/hugo-tania
```

2. Add `articles` page with [archives](https://github.com/WingLim/hugo-tania/wiki/Layout#archives) layout.

```bash
cat > content/articles.md <<EOF
---
title: Articles
subtitle: Posts, tutorials, snippets, musings, and everything else.
layout: "archives"
---
EOF
```

Edit your site config following [exampleSite/config.yaml](https://github.com/WingLim/hugo-tania/blob/main/exampleSite/config.yaml).

## Thanks to

- [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack) for dark mode switch
- [hugo-prose](https://github.com/yihui/hugo-prose) for float footnotes

## License

[MIT](https://github.com/WingLim/hugo-tania/blob/main/LICENSE)
