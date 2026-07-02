import React, {useEffect, useState} from 'react'
import {Container, PostForm} from '../components'
import appwriteService from "../appwrite/config";
import { useNavigate,  useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    setPosts(post)
                }
            })
        } else {
            navigate('/')
        }
    }, [slug, navigate])
  return post ? (
        <motion.div
            className='py-10'
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
        <Container>
                        <div className='mb-8 max-w-2xl animate-fade-up'>
                <p className='text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500'>Edit post</p>
                                <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl'>Refine the article before publishing.</h1>
                                <p className='mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base'>Adjust the content, image, or status without breaking the visual rhythm.</p>
            </div>
            <PostForm post={post} />
        </Container>
        </motion.div>
  ) : null
}

export default EditPost