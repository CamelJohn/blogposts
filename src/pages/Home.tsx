import { Stack, Title, Text, Group, Badge } from '@mantine/core'
import { useSearchParams } from 'react-router-dom'
import { allPosts } from '../lib/posts'
import PostCard from '../components/PostCard'

const allTags = [...new Set(allPosts.flatMap(p => p.tags))].sort()

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const activeTag = searchParams.get('tag')

  const filtered = activeTag
    ? allPosts.filter(p => p.tags.includes(activeTag))
    : allPosts

  function toggleTag(tag: string) {
    setSearchParams(activeTag === tag ? {} : { tag })
  }

  const [featured, ...rest] = filtered

  return (
    <Stack gap="xl">
      <Stack gap="xs" pb="xl" style={{ borderBottom: '1px solid var(--mantine-color-default-border)' }}>
        <Title
          order={1}
          style={{
            fontSize: 'clamp(2.5rem, 6vw, 4rem)',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, var(--mantine-color-violet-6), var(--mantine-color-blue-5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          The Context
        </Title>
        <Text c="dimmed" size="lg">
          Observations and takes on AI, context engineering, and everything in between.
        </Text>
      </Stack>

      {allTags.length > 0 && (
        <Group gap="xs">
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={activeTag === tag ? 'filled' : 'light'}
              style={{ cursor: 'pointer' }}
              onClick={() => toggleTag(tag)}
            >
              {tag}
            </Badge>
          ))}
        </Group>
      )}

      {filtered.length === 0 ? (
        <Text c="dimmed">No posts found.</Text>
      ) : (
        <Stack gap="xl">
          {featured && <PostCard post={featured} featured />}
          {rest.map(post => (
            <PostCard key={post.slug} post={post} />
          ))}
        </Stack>
      )}
    </Stack>
  )
}
