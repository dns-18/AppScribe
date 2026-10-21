import React, { useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link, useNavigate } from 'react-router-dom'
import { Button } from './ui/button'
import { Card, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import { CalendarDays, Clock, Pencil, Trash2 } from 'lucide-react'
import { pickCover } from '../lib/covers'

function PostCard({ $id, title, featuredImage, FeaturedImage, $createdAt, content, canManage = false, onDelete, featured = false }) {
  const navigate = useNavigate()
  const imageId = FeaturedImage || featuredImage
  const [imageError, setImageError] = useState(false)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const handleEdit = (event) => {
    event.preventDefault()
    navigate(`/edit-post/${$id}`)
  }

  const handleConfirmDelete = () => {
    onDelete?.()
    setConfirmOpen(false)
  }

  const formattedDate = $createdAt
    ? new Date($createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    : null

  let readTime = null
  if (content) {
    const words = content.replace(/<[^>]*>/g, ' ').split(/\s+/).filter(Boolean).length
    readTime = `${Math.max(1, Math.round(words / 200))} min read`
  }

  return (
    <Card className='group h-full overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_18px_50px_rgba(15,23,42,0.12)] dark:hover:shadow-[0_18px_50px_rgba(0,0,0,0.3)] animate-scale-in hover-lift'>
      <Link to={`/post/${$id}`} className='block'>
          <div className='relative overflow-hidden'>
          <div className='aspect-[4/3] bg-slate-100 dark:bg-slate-800'>
            {imageId && !imageError ? (
              <img
                src={appwriteService.getFileView(imageId)}
                alt={title}
                  className='h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]'
                onError={() => setImageError(true)}
              />
            ) : (
              <img
                src={pickCover($id || title || '')}
                alt=""
                className='h-full w-full object-cover'
              />
            )}
          </div>
          <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/40 to-transparent dark:from-black/50' />
        </div>

        <CardContent className='space-y-4 p-5'>
          <Badge variant={featured ? 'default' : 'outline'} className='w-fit'>
            {featured ? 'Featured' : 'Post'}
          </Badge>
          <h2 className='line-clamp-2 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-50'>
            {title}
          </h2>
          {(formattedDate || readTime) && (
            <div className='flex items-center gap-4 text-xs text-slate-500 dark:text-slate-400'>
              {formattedDate && (
                <span className='inline-flex items-center gap-1.5'>
                  <CalendarDays className='h-3.5 w-3.5' />
                  {formattedDate}
                </span>
              )}
              {readTime && (
                <span className='inline-flex items-center gap-1.5'>
                  <Clock className='h-3.5 w-3.5' />
                  {readTime}
                </span>
              )}
            </div>
          )}
          <p className='text-sm leading-6 text-slate-500 dark:text-slate-400'>
            Review the published version or open the editor for updates.
          </p>
        </CardContent>
      </Link>

      {canManage && (
        <CardFooter className='flex gap-2 border-t border-slate-100 p-5 dark:border-slate-800'>
          <Button variant='secondary' className='w-full' onClick={handleEdit}>
            <Pencil className='h-4 w-4' />
            Edit
          </Button>
          <Button variant='destructive' className='w-full' onClick={() => setConfirmOpen(true)}>
            <Trash2 className='h-4 w-4' />
            Delete
          </Button>
        </CardFooter>
      )}

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete this post?</DialogTitle>
            <DialogDescription>
              {`This permanently deletes "${title}" and cannot be undone.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant='outline' onClick={() => setConfirmOpen(false)}>
              Cancel
            </Button>
            <Button variant='destructive' onClick={handleConfirmDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  )
}

export default PostCard
