---
title: "CSS Features You Probably Aren't Using"
date: 2026-04-01
tags: [css, design]
excerpt: "Container queries, cascade layers, and a few other CSS features that are now safe to use and genuinely useful."
draft: false
---

# CSS Features You Probably Aren't Using

Browser support has caught up. Time to use these.

## Container queries

Media queries respond to the viewport. Container queries respond to the parent element — which is almost always what you actually want.

```css
.card-wrapper {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    display: grid;
    grid-template-columns: 1fr 2fr;
  }
}
```

## Cascade layers

Control specificity without fighting it.

```css
@layer base, components, utilities;

@layer base {
  button { padding: 0.5rem 1rem; }
}

@layer utilities {
  .p-0 { padding: 0; } /* wins over base, regardless of order */
}
```
