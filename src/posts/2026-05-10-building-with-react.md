---
title: "Building with React in 2026"
date: 2026-05-10
tags: [react, javascript]
excerpt: "React keeps evolving. Here's what the modern React stack looks like today and why I still reach for it."
draft: false
---

# Building with React in 2026

React keeps evolving. Here's what the modern React stack looks like today and why I still reach for it.

## The ecosystem

The tooling around React has never been better. Vite replaced CRA years ago and never looked back.

```tsx
import { useState } from 'react'

function Counter() {
  const [count, setCount] = useState(0)
  return <button onClick={() => setCount(c => c + 1)}>{count}</button>
}
```

More thoughts coming in future posts.
