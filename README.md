# Hugo Theme Tania

[![Netlify Status](https://api.netlify.com/api/v1/badges/bae5db51-7cc6-41e2-9615-029ade8aa264/deploy-status)](https://app.netlify.com/sites/hugo-tania/deploys)

A simple theme for bloggers.

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

In your site's root dir

```bash
git submodule add https://github.com/WingLim/hugo-tania themes/hugo-tania
```

Edit your site config following [exampleSite/config.yaml](https://github.com/WingLim/hugo-tania/blob/main/exampleSite/config.yaml).

## Configuration

### Menu

You can custom header and footer menu.

```yaml
menu:
  header:
    - name: Articles
      url: "/articles/"
  footer:
    - name: RSS
      url: "/index.xml"
```

### Site Configuration

There are a few configuration options that you can add to your `config.yaml` file.

You can also see the `toml` example in [exampleSite/config.example.toml](https://github.com/WingLim/hugo-tania/blob/main/exampleSite/config.example.toml)

```yaml
params:
  # Emoji will show before the blog title on site navbar.
  titleEmoji: '😎'

  # Logo will show before the blog title on site navbar.
  titleLogo:
  
  # Enable float footnotes.
  # Default to true
  enableFootnotes: true

  # Limit how many categories filter show above search input.
  # Default to 5
  maxCategoryToShow: 10

  # Show your socail information with icon on index bio with `_index.md` content.
  socialOptions:
    dev-to:
    email:
    facebook:
    github:
    instagram:
    linkedin:
    medium:
    stack-overflow:
    steam:
    telegram:
    twitter:
    twitch:
    whatsapp:

  # Addtional option for meta SEO
  siteName:
  siteDesc: 
  author: 
```

## Layout

### Archives

`archives` layout is for showing all articles you write.

Add `articles.md` to site `content` dir, and write as below:

If you want to show it on site header, see [#Menu](#menu)

```markdown
---
title: Articles
subtitle: Posts, tutorials, snippets, musings, and everything else.
date: 2020-11-26
type: section
layout: "archives"
---
```

## Article Params

### Enable math formula render

For enable math formula render, add `katex: true` or `mathjax: true` in your article head, like:

Notice: You should enable only one `katex` or `mathjax` in a same time.

```markdown
---
title: Title
katex: true
---

Some content...

```

## Thanks to
- [你好黑暗，我的老朋友 —— 为网站添加用户友好的深色模式支持](https://blog.skk.moe/post/hello-darkmode-my-old-friend/)
- [Footnotes, citations, and sidenotes](https://prose.yihui.org/about/#footnotes-citations-and-sidenotes)

## License

[MIT](https://github.com/WingLim/hugo-tania/blob/main/LICENSE)