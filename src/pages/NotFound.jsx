import React from 'react'
import { Link } from 'react-router-dom'
import { Container } from '../components'
import { Button } from '../components/ui/button'
import { BookOpen, Home } from 'lucide-react'
import emptyPosts from '../assets/empty-posts.svg'

function NotFound() {
  return (
    <div className="w-full py-16">
      <Container>
        <div className="animate-fade-up text-center">
          <img
            src={emptyPosts}
            alt=""
            aria-hidden="true"
            className="mx-auto w-44 animate-soft-float"
          />
          <h1 className="mt-8 text-6xl font-bold tracking-tight text-slate-900 dark:text-slate-50">
            404
          </h1>
          <h2 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-slate-50">
            This page wandered off.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-slate-500 dark:text-slate-400">
            The page you&apos;re looking for doesn&apos;t exist or may have been moved.
          </p>
          <div className="mt-8 flex justify-center gap-3">
            <Button asChild>
              <Link to="/">
                <Home className="h-4 w-4" />
                Back home
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/all-posts">
                <BookOpen className="h-4 w-4" />
                Browse posts
              </Link>
            </Button>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default NotFound
