import React, {useState, useEffect, useRef} from 'react'
import { Container, PostCard } from '../components'
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { useScrollReveal } from '../hooks/useScrollReveal';

function AllPosts() {
    const [posts, setPosts] = useState([])
    const userData = useSelector((state) => state.auth.userData)
    const pageRef = useRef(null)

    useScrollReveal(pageRef, [posts.length])

    useEffect(() => {
        appwriteService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
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
            </Container>
    </motion.div>
  )
}

export default AllPosts
