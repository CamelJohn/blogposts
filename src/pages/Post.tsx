import { useParams, Link } from 'react-router-dom'
import { Stack, Title, Text, Badge, Group, Anchor } from '@mantine/core'
import { IconArrowLeft } from '@tabler/icons-react'
import { getPost } from '../lib/posts'
import PostBody from '../components/PostBody'

export default function Post() {
  const { slug } = useParams<{ slug: string }>()
  const post = getPost(slug ?? '')

  if (!post) {
    return (
      <Stack>
        <Text>Post not found.</Text>
        <Anchor component={Link} to="/">Back to posts</Anchor>
      </Stack>
    )
  }

  return (
    <Stack gap="lg" maw={680} mx="auto">
      <Anchor component={Link} to="/" c="dimmed" size="sm" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconArrowLeft size={14} /> All posts
      </Anchor>

      <Stack gap="sm">
        <Title order={1} style={{ lineHeight: 1.2, fontSize: 'clamp(1.6rem, 4vw, 2.2rem)' }}>
          {post.title}
        </Title>
        <Group gap="xs" align="center">
          <Text c="dimmed" size="sm">
            {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
          </Text>
          <Text c="dimmed" size="sm">·</Text>
          <Text c="dimmed" size="sm">{post.readTime} min read</Text>
          {post.tags.map(tag => (
            <Badge key={tag} variant="light" size="sm" radius="sm">{tag}</Badge>
          ))}
        </Group>
      </Stack>

      <PostBody content={post.content} />
    </Stack>
  )
}
