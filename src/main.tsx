import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider, createTheme } from '@mantine/core'
import '@mantine/core/styles.css'
import './index.css'
import App from './App'

const theme = createTheme({
  primaryColor: 'violet',
  fontFamily: 'Inter, system-ui, sans-serif',
  headings: {
    fontFamily: 'Inter, system-ui, sans-serif',
    fontWeight: '700',
  },
  defaultRadius: 'md',
})

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="auto">
      <App />
    </MantineProvider>
  </StrictMode>
)
