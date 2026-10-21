import React, { lazy } from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './App.css'
import 'lenis/dist/lenis.css'

import App from './App.jsx'

import { Provider } from 'react-redux'
import store from './store/store.js'

import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import Home from './pages/Home.jsx'

const AddPost = lazy(() => import('./pages/AddPost.jsx'))
const Signup = lazy(() => import('./pages/Signup.jsx'))
const EditPost = lazy(() => import('./pages/EditPost.jsx'))
const Post = lazy(() => import('./pages/Post.jsx'))
const AllPosts = lazy(() => import('./pages/AllPosts.jsx'))
const NotFound = lazy(() => import('./pages/NotFound.jsx'))
const Login = lazy(() => import('./components/Login.jsx'))

import {
  AuthLayout,
} from './components'
import { ThemeProvider } from './components/theme-provider'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [

      {
        path: '/',
        element: <Home />,
      },

      {
        path: '/login',
        element: (
          <AuthLayout authentication={false}>
            <Login />
          </AuthLayout>
        ),
      },

      {
        path: '/signup',
        element: (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        ),
      },

      {
        path: '/all-posts',
        element: <AllPosts />,
      },

      {
        path: '/add-post',
        element: (
          <AuthLayout authentication>
            <AddPost />
          </AuthLayout>
        ),
      },

      {
        path: '/edit-post/:slug',
        element: (
          <AuthLayout authentication>
            <EditPost />
          </AuthLayout>
        ),
      },

      {
        path: '/post/:slug',
        element: <Post />,
      },

      {
        path: '*',
        element: <NotFound />,
      },

    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
        <RouterProvider router={router} />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
)
