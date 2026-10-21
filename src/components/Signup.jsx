// import React, {useState} from 'react'
// import authService from '../appwrite/auth'
// import {Link ,useNavigate} from 'react-router-dom'
// import {login} from '../store/authSlice'
// import {Button, Input, Logo} from './index.js'
// import {useDispatch} from 'react-redux'
// import {useForm} from 'react-hook-form'

// function Signup() {
//     const navigate = useNavigate()
//     const [error, setError] = useState("")
//     const dispatch = useDispatch()
//     const {register, handleSubmit} = useForm()

//     const create = async(data) => {
//         setError("")
//         try {
//             const userData = await authService.createAccount(data)
//             if (userData) {
//                 const userData = await authService.getCurrentUser()
//                 if(userData) dispatch(login({userData}));
//                 navigate("/")
//             }
//         } catch (error) {
//             setError(error.message)
//         }
//     }

//   return (
//     <div className="flex items-center justify-center">
//             <div className={`mx-auto w-full max-w-lg bg-gray-100 rounded-xl p-10 border border-black/10`}>
//             <div className="mb-2 flex justify-center">
//                     <span className="inline-block w-full max-w-[100px]">
//                         <Logo width="100%" />
//                     </span>
//                 </div>
//                 <h2 className="text-center text-2xl font-bold leading-tight">Sign up to create account</h2>
//                 <p className="mt-2 text-center text-base text-black/60">
//                     Already have an account?&nbsp;
//                     <Link
//                         to="/login"
//                         className="font-medium text-primary transition-all duration-200 hover:underline"
//                     >
//                         Sign In
//                     </Link>
//                 </p>
//                 {error && <p className="text-red-600 mt-8 text-center">{error}</p>}

//                 <form onSubmit={handleSubmit(create)}>
//                     <div className='space-y-5'>
//                         <Input
//                         label="Full Name: "
//                         placeholder="Enter your full name"
//                         {...register("name", {
//                             required: true,
//                         })}
//                         />
//                         <Input
//                         label="Email: "
//                         placeholder="Enter your email"
//                         type="email"
//                         {...register("email", {
//                             required: true,
//                             validate: {
//                                 matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
//                                 "Email address must be a valid address",
//                             }
//                         })}
//                         />
//                         <Input
//                         label="Password: "
//                         type="password"
//                         placeholder="Enter your password"
//                         {...register("password", {
//                             required: true,})}
//                         />
//                         <Button type="submit" className="w-full">
//                             Create Account
//                         </Button>
//                     </div>
//                 </form>
//             </div>

//     </div>
//   )
// }

// export default Signup


import React, { useState } from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Container, Input, Logo } from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { motion } from 'framer-motion'
import { toast } from 'sonner'
import heroIllustration from '../assets/hero-illustration.svg'

function Signup() {
  const navigate = useNavigate()
  const [error, setError] = useState("")
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const create = async (data) => {
    setError("")
    try {
      const userData = await authService.createAccount(data)
      if (userData) {
        const currentUser = await authService.getCurrentUser()
        if (currentUser) dispatch(login({ userData: currentUser }))
        toast.success('Account created — welcome to AppScribe')
        navigate("/")
      }
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <motion.div
      className="w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="w-full py-10">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div className="relative hidden overflow-hidden rounded-[2rem] bg-gradient-to-br from-indigo-600 via-indigo-700 to-slate-900 p-10 text-white lg:block">
              <img
                src={heroIllustration}
                alt=""
                aria-hidden="true"
                className="mx-auto w-full max-w-sm rounded-3xl bg-white/95 p-4"
              />
              <h2 className="mt-8 text-2xl font-bold tracking-tight">
                Start publishing in minutes.
              </h2>
              <p className="mt-3 text-sm leading-6 text-indigo-100">
                Create an account to write, review, and manage your posts in one clean dashboard.
              </p>
            </div>
            <Card className="mx-auto w-full max-w-md motion-sheen lg:mx-0">

        <CardHeader className="space-y-4 text-center">
          <div className="flex justify-center">
            <Logo width="150px" />
          </div>
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500">
              Get started
            </p>
            <CardTitle>Create your account</CardTitle>
            <CardDescription>
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-medium text-indigo-600 transition-colors duration-150 hover:text-indigo-700 hover:underline"
              >
                Sign in
              </Link>
            </CardDescription>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <div className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 dark:border-rose-900/60 dark:bg-rose-950/40">
              <p className="text-center text-sm text-rose-600 dark:text-rose-300">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit(create)}>
            <div className="space-y-5">
              <Input
                label="Full name"
                placeholder="Enter your full name"
                {...register("name", {
                  required: true,
                })}
              />
              <Input
                label="Email"
                placeholder="Enter your email"
                type="email"
                {...register("email", {
                  required: true,
                  validate: {
                    matchPattern: (value) =>
                      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                      "Enter a valid email address",
                  },
                })}
              />
              <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: true,
                })}
              />
              <Button type="submit" className="w-full">
                Create account
              </Button>
            </div>
          </form>
        </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    </motion.div>
  )
}

export default Signup