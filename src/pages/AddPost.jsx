import React from 'react'
import { Container, PostForm } from '../components'
import { motion } from 'framer-motion'

function AddPost() {
  return (
  <motion.div
    className='py-10'
    initial={{ opacity: 0, y: 24 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
  >
    <Container>
      <div className='mb-8 max-w-2xl animate-fade-up'>
        <p className='text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500'>New post</p>
        <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl'>Create a polished post.</h1>
        <p className='mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base'>Use the editor, add a strong image, and publish with a cleaner workflow.</p>
      </div>
    </Container>
        <Container>
            <PostForm />
        </Container>
    </motion.div>
  )
}

export default AddPost