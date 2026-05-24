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
    <Stack gap="md">
      <Anchor component={Link} to="/" c="dimmed" size="sm" style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
        <IconArrowLeft size={14} /> All posts
      </Anchor>
      <Title>{post.title}</Title>
      <Group gap="sm">
        <Text c="dimmed" size="sm">
          {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </Text>
        {post.tags.map(tag => (
          <Badge key={tag} variant="light" size="sm">{tag}</Badge>
        ))}
      </Group>
      <PostBody content={post.content} />
    </Stack>
  )
}
