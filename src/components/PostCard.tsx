import { Stack, Text, Title, Badge, Group, Divider } from '@mantine/core'
import { Link } from 'react-router-dom'
import type { PostMeta } from '../lib/posts'

interface Props {
  post: PostMeta
  featured?: boolean
}

export default function PostCard({ post, featured = false }: Props) {
  return (
    <Link to={`/posts/${post.slug}`} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Stack gap="xs">
        <Title
          order={featured ? 1 : 2}
          style={{
            fontSize: featured ? 'clamp(1.6rem, 4vw, 2.4rem)' : '1.25rem',
            lineHeight: 1.25,
            transition: 'color 150ms ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--mantine-color-violet-5)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'inherit')}
        >
          {post.title}
        </Title>

        <Group gap="xs" align="center">
          <Text size="sm" c="dimmed">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
          <Text size="sm" c="dimmed">·</Text>
          <Text size="sm" c="dimmed">{post.readTime} min read</Text>
          {post.tags.map(tag => (
            <Badge key={tag} variant="light" size="xs" radius="sm">{tag}</Badge>
          ))}
        </Group>

        {post.excerpt && (
          <Text c="dimmed" size={featured ? 'md' : 'sm'} lineClamp={featured ? 3 : 2} style={{ lineHeight: 1.65 }}>
            {post.excerpt}
          </Text>
        )}

        <Divider mt="sm" />
      </Stack>
    </Link>
  )
}
