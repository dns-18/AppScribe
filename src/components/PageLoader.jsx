import React from 'react'
import Logo from './Logo'
import { Skeleton } from './ui/skeleton'

function PageLoader() {
  return (
    <div className="flex min-h-[60vh] w-full flex-col items-center justify-center gap-5 py-16">
      <Logo width="150px" className="animate-pulse" />
      <Skeleton className="h-1.5 w-44 rounded-full" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

export default PageLoader
