---
title: "What Makes a Good Design System"
date: 2026-02-28
tags: [design, css]
excerpt: "After working with several design systems, here's what separates the ones that help from the ones that get abandoned."
draft: false
---

# What Makes a Good Design System

After working with several design systems, here's what actually matters.

## Constraints over flexibility

A design system that lets you do anything isn't a system — it's a library. Good systems say no.

Spacing should come from a scale. Colors should come from a palette. Anything outside those is a conversation, not a prop.

## Tokens all the way down

Design tokens are the contract between design and code. Name them semantically, not visually.

```css
/* bad */
--color-blue-500: #3b82f6;

/* good */
--color-action-primary: #3b82f6;
```

When you rebrand, you change one file — not 200 component styles.
