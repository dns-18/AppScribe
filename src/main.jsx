import React from 'react'
import ReactDOM from 'react-dom/client'

import './index.css'
import './App.css'

import App from './App.jsx'

import { Provider } from 'react-redux'
import store from './store/store.js'

import {
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom'

import Home from './pages/Home.jsx'
import AddPost from './pages/AddPost.jsx'
import Signup from './pages/Signup.jsx'
import EditPost from './pages/EditPost.jsx'
import Post from './pages/Post.jsx'
import AllPosts from './pages/AllPosts.jsx'

import {
  AuthLayout,
  Login,
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
        element: (
          <AuthLayout authentication>
            <AllPosts />
          </AuthLayout>
        ),
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
        element: <h1>404 Page Not Found</h1>,
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