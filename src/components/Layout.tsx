import { Outlet, Link } from 'react-router-dom'
import {
  AppShell,
  Group,
  Anchor,
  ActionIcon,
  Container,
  useMantineColorScheme,
  useComputedColorScheme,
} from '@mantine/core'
import { IconSun, IconMoon, IconRss } from '@tabler/icons-react'

export default function Layout() {
  const { toggleColorScheme } = useMantineColorScheme()
  const computed = useComputedColorScheme('light')

  return (
    <AppShell header={{ height: 60 }} padding="md">
      <AppShell.Header>
        <Group h="100%" px="md" justify="space-between">
          <Anchor component={Link} to="/" fw={700} size="lg" underline="never"
            style={{
              background: 'linear-gradient(135deg, var(--mantine-color-violet-6), var(--mantine-color-blue-5))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            My Blog
          </Anchor>
          <Group gap="xs">
            <ActionIcon component="a" href="/blogposts/rss.xml" target="_blank" variant="subtle" size="lg" aria-label="RSS feed">
              <IconRss size={18} />
            </ActionIcon>
            <ActionIcon onClick={toggleColorScheme} variant="subtle" size="lg" aria-label="Toggle color scheme">
              {computed === 'dark' ? <IconSun size={18} /> : <IconMoon size={18} />}
            </ActionIcon>
          </Group>
        </Group>
      </AppShell.Header>
      <AppShell.Main>
        <Container size="md" py="xl">
          <Outlet />
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}
