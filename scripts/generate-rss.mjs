import { readFileSync, writeFileSync, readdirSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// ── Update these to match your site ──────────────────────────────────────────
const SITE_URL = 'https://USERNAME.github.io/blogposts'
const SITE_TITLE = 'My Blog'
const SITE_DESCRIPTION = 'Thoughts on AI and software.'
// ─────────────────────────────────────────────────────────────────────────────

function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data = {}
  for (const line of match[1].split('\n')) {
    const colon = line.indexOf(':')
    if (colon === -1) continue
    const key = line.slice(0, colon).trim()
    const val = line.slice(colon + 1).trim()
    if (val.startsWith('[') && val.endsWith(']')) {
      data[key] = val.slice(1, -1).split(',').map(s => s.trim()).filter(Boolean)
    } else if (val === 'true') {
      data[key] = true
    } else if (val === 'false') {
      data[key] = false
    } else {
      data[key] = val.replace(/^["']|["']$/g, '')
    }
  }

  return { data, content: match[2] }
}

function escapeXml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

function toRfc822(dateStr) {
  return new Date(dateStr).toUTCString()
}

const postsDir = join(__dirname, '../src/posts')
const files = readdirSync(postsDir).filter(f => f.endsWith('.md'))

const posts = files
  .map(file => {
    const raw = readFileSync(join(postsDir, file), 'utf-8')
    const { data } = parseFrontmatter(raw)
    return {
      slug: file.replace('.md', ''),
      title: data.title ?? 'Untitled',
      date: String(data.date ?? ''),
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? '',
      draft: data.draft ?? false,
    }
  })
  .filter(p => !p.draft && p.date)
  .sort((a, b) => new Date(b.date) - new Date(a.date))

const items = posts.map(post => `
  <item>
    <title>${escapeXml(post.title)}</title>
    <link>${SITE_URL}/posts/${post.slug}</link>
    <guid>${SITE_URL}/posts/${post.slug}</guid>
    <pubDate>${toRfc822(post.date)}</pubDate>
    ${post.excerpt ? `<description>${escapeXml(post.excerpt)}</description>` : ''}
    ${post.tags.map(t => `<category>${escapeXml(t)}</category>`).join('\n    ')}
  </item>`).join('')

const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(SITE_TITLE)}</title>
    <link>${SITE_URL}</link>
    <description>${escapeXml(SITE_DESCRIPTION)}</description>
    <language>en-us</language>
    <lastBuildDate>${toRfc822(posts[0]?.date ?? new Date().toISOString())}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml"/>
    ${items}
  </channel>
</rss>`

writeFileSync(join(__dirname, '../public/rss.xml'), rss.trim())
console.log(`RSS feed generated with ${posts.length} posts.`)
