import { useEffect, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { codeToHtml } from 'shiki'
import { Typography, useComputedColorScheme, ActionIcon, Tooltip } from '@mantine/core'
import { useClipboard } from '@mantine/hooks'
import { IconCopy, IconCheck } from '@tabler/icons-react'
import type { Components } from 'react-markdown'

let mermaidCounter = 0

function MermaidBlock({ code, isDark }: { code: string; isDark: boolean }) {
  const [svg, setSvg] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    const id = `mermaid-${++mermaidCounter}`
    import('mermaid').then(({ default: mermaid }) => {
      mermaid.initialize({ startOnLoad: false, theme: isDark ? 'dark' : 'default' })
      return mermaid.render(id, code)
    }).then(({ svg }) => {
      setSvg(svg)
      setError(false)
    }).catch(() => setError(true))
  }, [code, isDark])

  if (error) return <pre><code>{code}</code></pre>
  if (!svg) return null
  return (
    <div
      style={{ overflowX: 'auto', margin: '1.5rem 0', textAlign: 'center' }}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  )
}

function CodeBlock({ lang = 'text', code, isDark }: { lang: string; code: string; isDark: boolean }) {
  const [html, setHtml] = useState('')
  const { copy, copied } = useClipboard({ timeout: 2000 })
  const theme = isDark ? 'github-dark' : 'github-light'

  useEffect(() => {
    codeToHtml(code, { lang, theme }).then(setHtml).catch(() => setHtml(''))
  }, [code, lang, theme])

  return (
    <div style={{ position: 'relative' }}>
      <Tooltip label={copied ? 'Copied!' : 'Copy'} withArrow position="left">
        <ActionIcon
          onClick={() => copy(code)}
          variant="subtle"
          size="sm"
          aria-label="Copy code"
          color={copied ? 'teal' : 'gray'}
          style={{ position: 'absolute', top: 10, right: 10, zIndex: 1 }}
        >
          {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
        </ActionIcon>
      </Tooltip>
      {html
        ? <span dangerouslySetInnerHTML={{ __html: html }} />
        : <pre><code>{code}</code></pre>
      }
    </div>
  )
}

export default function PostBody({ content }: { content: string }) {
  const computed = useComputedColorScheme('light')
  const isDark = computed === 'dark'

  const components: Components = {
    code({ className, children }) {
      const lang = className?.replace('language-', '') ?? ''
      const code = String(children).trim()
      if (lang === 'mermaid') return <MermaidBlock code={code} isDark={isDark} />
      if (lang) return <CodeBlock lang={lang} code={code} isDark={isDark} />
      return <code>{children}</code>
    },
  }

  return (
    <Typography>
      <ReactMarkdown remarkPlugins={[remarkGfm]} rehypePlugins={[rehypeRaw]} components={components}>
        {content}
      </ReactMarkdown>
    </Typography>
  )
}
