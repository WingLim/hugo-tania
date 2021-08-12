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

Notice: if you want use disqus as comment system in this theme, you need to set `disqusShortname` in `config` root and `comments` in `params`.

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

  # Comments settings
  comments:
    enable: true
    provider: disqus
```

## Custom

### Custom font-family

We have 5 variables to custom font-family in [_variables.scss](https://github.com/WingLim/hugo-tania/blob/main/assets/sass/base/_variables.scss):

```css
:root {
    --sys-font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Droid Sans", "Helvetica Neue";
    --zh-font-family: "PingFang SC", "Hiragino Sans GB", "Droid Sans Fallback", "Microsoft YaHei";
    --base-font-family: var(--sys-font-family), var(--zh-font-family);
    --code-font-family: Menlo, Monaco, Consolas, "Courier New", monospace;
    --article-font-family: var(--base-font-family);
}
```


Create file `layouts/partials/head/custom.html` in your site root directory.

```html
<style>
  :root {
      --article-font-family: "Noto Serif SC", var(--base-font-family);
  }
</style>

<!-->This script use to load font from outside<-->
<script>
  (function () {
      const customFont = document.createElement('link');
      customFont.href = "https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap";

      customFont.type = "text/css";
      customFont.rel = "stylesheet";

      document.head.appendChild(customFont);
  }());
</script>
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
- [hugo-theme-stack](https://github.com/CaiJimmy/hugo-theme-stack) for dark mode switch
- [hugo-prose](https://github.com/yihui/hugo-prose) for float footnotes

## License

[MIT](https://github.com/WingLim/hugo-tania/blob/main/LICENSE)