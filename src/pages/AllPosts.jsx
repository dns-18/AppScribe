import React, {useState, useEffect, useRef} from 'react'
import { Container, PostCard, Button } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PenLine } from 'lucide-react';
import emptyPosts from '../assets/empty-posts.svg';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';
import { Skeleton } from '../components/ui/skeleton';
import { toast } from 'sonner';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const userData = useSelector((state) => state.auth.userData)
    const pageRef = useRef(null)

    useScrollReveal(pageRef, [posts.length])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false))
    }, [])

    const canManagePost = (post) => {
        if (!userData) return false
        const postUserId = post.UserId || post.userId
        return postUserId === userData.$id || !postUserId
    }

    const deletePost = async (post) => {
        const featuredImage = post.FeaturedImage || post.featuredImage
        const status = await appwriteService.deletePost(post.$id)

        if (status) {
            if (featuredImage) {
                await appwriteService.deleteFile(featuredImage)
            }

            setPosts((posts) => posts.filter((item) => item.$id !== post.$id))
            toast.success('Post deleted')
        } else {
            toast.error('Could not delete this post. Please try again.')
        }
    }

  return (
    <motion.div
      ref={pageRef}
      className='w-full py-10'
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
        <Container>
            <div data-reveal className='mb-8 max-w-2xl'>
                <p className='text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500'>All posts</p>
                <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl'>Manage every post from one clean view.</h1>
                <p className='mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base'>Edit, delete, or review content in a layout that feels more like a product than a template.</p>
            </div>
            {loading ? (
                <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-900/90">
                            <Skeleton className="aspect-[4/3] w-full rounded-none" />
                            <div className="space-y-3 p-5">
                                <Skeleton className="h-4 w-16" />
                                <Skeleton className="h-5 w-full" />
                                <Skeleton className="h-4 w-2/3" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : posts.length === 0 ? (
                <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 px-6 py-16 text-center dark:border-slate-800 dark:bg-slate-900/90">
                    <img src={emptyPosts} alt="" aria-hidden="true" className="mx-auto w-52" />
                    <h2 className='mt-6 text-xl font-semibold text-slate-900 dark:text-slate-50'>No posts yet</h2>
                    <p className='mx-auto mt-2 max-w-sm text-sm leading-6 text-slate-500 dark:text-slate-400'>When you publish your first post, it will show up here.</p>
                    <div className='mt-6 flex justify-center'>
                        <Button asChild>
                            <Link to="/add-post">
                                <PenLine className='h-4 w-4' />
                                Create post
                            </Link>
                        </Button>
                    </div>
                </div>
            ) : (
            <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                {posts.map((post) => (
                    <div key={post.$id} data-reveal className='h-full hover-lift'>
                        <PostCard
                            {...post}
                            canManage={canManagePost(post)}
                            onDelete={() => deletePost(post)}
                        />
                    </div>
                ))}
            </div>
            )}
            </Container>
    </motion.div>
  )
}

export default AllPosts
