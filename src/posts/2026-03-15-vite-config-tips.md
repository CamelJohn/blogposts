---
title: "Vite Config Tips for Real Projects"
date: 2026-03-15
tags: [vite, javascript, tooling]
excerpt: "Vite works great out of the box but a few config tweaks make a big difference on larger projects."
draft: false
---

# Vite Config Tips for Real Projects

Vite works great out of the box. These tweaks make it even better.

## Path aliases

Stop writing `../../../components`. Set up an alias once.

```ts
import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
```

Then import like: `import Button from '@/components/Button'`.

## Chunk splitting

By default Vite puts everything in one chunk. For larger apps, split vendor code manually.

```ts
build: {
  rollupOptions: {
    output: {
      manualChunks: {
        vendor: ['react', 'react-dom'],
        ui: ['@mantine/core'],
      },
    },
  },
},
```
