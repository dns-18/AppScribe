import React, { useState } from 'react'
import appwriteService from "../appwrite/config"
import { Link, useNavigate } from 'react-router-dom'
import Button from './Button'
import { Card, CardContent, CardFooter } from './ui/card'
import { Badge } from './ui/badge'

function PostCard({ $id, title, featuredImage, FeaturedImage, canManage = false, onDelete }) {
  const navigate = useNavigate()
  const imageId = FeaturedImage || featuredImage
  const [imageError, setImageError] = useState(false)

  const handleEdit = (event) => {
    event.preventDefault()
    navigate(`/edit-post/${$id}`)
  }

  const handleDelete = (event) => {
    event.preventDefault()
    onDelete?.()
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
              <div className='flex h-full w-full items-center justify-center text-sm font-medium text-slate-400 dark:text-slate-500'>
                No Image
              </div>
            )}
          </div>
          <div className='absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-slate-950/40 to-transparent dark:from-black/50' />
        </div>

        <CardContent className='space-y-4 p-5'>
          <Badge variant='outline' className='w-fit'>
            Post
          </Badge>
          <h2 className='line-clamp-2 text-lg font-semibold leading-snug text-slate-900 dark:text-slate-50'>
            {title}
          </h2>
          <p className='text-sm leading-6 text-slate-500 dark:text-slate-400'>
            Review the published version or open the editor for updates.
          </p>
        </CardContent>
      </Link>

      {canManage && (
        <CardFooter className='flex gap-2 border-t border-slate-100 p-5 dark:border-slate-800'>
          <Button variant='secondary' className='w-full' onClick={handleEdit}>
            Edit
          </Button>
          <Button variant='destructive' className='w-full' onClick={handleDelete}>
            Delete
          </Button>
        </CardFooter>
      )}
    </Card>
  )
}

export default PostCard
