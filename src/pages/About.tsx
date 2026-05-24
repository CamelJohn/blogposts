import { Stack, Title, Text, Anchor, Divider, Group, Badge } from '@mantine/core'
import { IconBrandGithub } from '@tabler/icons-react'

export default function About() {
  return (
    <Stack gap="xl" maw={640}>
      <Stack gap="xs">
        <Title
          order={1}
          style={{
            fontSize: 'clamp(2rem, 5vw, 3rem)',
            lineHeight: 1.1,
            background: 'linear-gradient(135deg, var(--mantine-color-violet-6), var(--mantine-color-blue-5))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          Hey, I'm Jonathan.
        </Title>
        <Text c="dimmed" size="lg">
          I build things, watch AI grow, and write about what I find.
        </Text>
      </Stack>

      <Divider />

      <Stack gap="md">
        <Text size="md" style={{ lineHeight: 1.75 }}>
          I'm a self-taught engineer interested in how AI is changing the way we build software —
          particularly around context engineering, agentic systems, and the gap between
          what models can do in demos versus production.
        </Text>
        <Text size="md" style={{ lineHeight: 1.75 }}>
          This blog is where I think out loud. Some posts are technical, some are
          observations, some are rants. All of them are things I actually care about.
        </Text>
      </Stack>

      <Stack gap="sm">
        <Text fw={600}>What I'm focused on</Text>
        <Group gap="xs">
          {['Context Engineering', 'AI Agents', 'LLMs', 'Developer Tools', 'Software'].map(t => (
            <Badge key={t} variant="light" size="md" radius="sm">{t}</Badge>
          ))}
        </Group>
      </Stack>

      <Divider />

      <Group gap="md">
        <Anchor href="https://github.com/cameljohn" target="_blank" style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <IconBrandGithub size={18} />
          cameljohn
        </Anchor>
      </Group>
    </Stack>
  )
}
