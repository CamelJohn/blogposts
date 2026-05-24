---
title: "TypeScript Tips I Wish I Knew Earlier"
date: 2026-04-20
tags: [typescript, javascript]
excerpt: "A handful of TypeScript patterns that cleaned up my code and made my teammates stop asking questions."
draft: false
---

# TypeScript Tips I Wish I Knew Earlier

A handful of patterns that cleaned up my code considerably.

## Discriminated unions

Stop using optional fields to represent state. Use a union instead.

```ts
type Result<T> =
  | { status: 'loading' }
  | { status: 'error'; message: string }
  | { status: 'ok'; data: T }

function handle(result: Result<User>) {
  if (result.status === 'ok') {
    console.log(result.data) // fully typed
  }
}
```

## satisfies

The `satisfies` operator lets you validate a value against a type without widening it.

```ts
const palette = {
  red: [255, 0, 0],
  green: '#00ff00',
} satisfies Record<string, string | number[]>

palette.red.map(x => x) // still typed as number[], not string | number[]
```
