export interface PostMeta {
  slug: string
  title: string
  date: string
  tags: string[]
  excerpt: string
  draft: boolean
  readTime: number
}

export interface Post extends PostMeta {
  content: string
}

function parseFrontmatter(raw: string): { data: Record<string, unknown>; content: string } {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const data: Record<string, unknown> = {}
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

function calcReadTime(content: string): number {
  const words = content.trim().split(/\s+/).length
  return Math.max(1, Math.round(words / 200))
}

const rawFiles = import.meta.glob<string>('../posts/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

function slugFromPath(path: string) {
  return path.replace('../posts/', '').replace('.md', '')
}

export const allPosts: Post[] = Object.entries(rawFiles)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: String(data.title ?? 'Untitled'),
      date: String(data.date ?? ''),
      tags: (data.tags as string[]) ?? [],
      excerpt: String(data.excerpt ?? ''),
      draft: Boolean(data.draft ?? false),
      readTime: calcReadTime(content),
      content,
    }
  })
  .filter(post => !post.draft)
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPost(slug: string): Post | undefined {
  return allPosts.find(p => p.slug === slug)
}
