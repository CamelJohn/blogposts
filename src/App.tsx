import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Post from './pages/Post'
import About from './pages/About'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'posts/:slug', element: <Post /> },
        { path: 'about', element: <About /> },
      ],
    },
  ],
  { basename: '/blogposts' }
)

export default function App() {
  return <RouterProvider router={router} />
}
