import React,{useEffect, useLayoutEffect, useRef, useState} from 'react'
import appwriteService from "../appwrite/config";
import {Container, PostCard, Button} from '../components'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { gsap } from '../lib/gsap'
import { useScrollReveal } from '../hooks/useScrollReveal'
import { Skeleton } from '../components/ui/skeleton'
import heroIllustration from '../assets/hero-illustration.svg'

function Home() {
    const [posts, setPosts] = useState([])
    const [loading, setLoading] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)
    const homeRef = useRef(null)

    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        }).finally(() => setLoading(false))
    }, [])

    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const firstLoadTimeline = gsap.timeline({ defaults: { ease: 'power3.out' } })

            firstLoadTimeline
                .fromTo('.hero-eyebrow', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.7 })
                .fromTo('.hero-title', { opacity: 0, y: 42 }, { opacity: 1, y: 0, duration: 1 }, '-=0.35')
                .fromTo('.hero-copy', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.55')
                .fromTo('.hero-cta', { opacity: 0, y: 18 }, { opacity: 1, y: 0, duration: 0.75, stagger: 0.08 }, '-=0.45')
                .fromTo('.hero-stats', { opacity: 0, scale: 0.96 }, { opacity: 1, scale: 1, duration: 0.7 }, '-=0.3')
        }, homeRef)

        return () => ctx.revert()
    }, [posts.length])

    useScrollReveal(homeRef, [posts.length])

    if (loading) {
        return (
            <div ref={homeRef} className="w-full py-10">
                <Container>
                    <div className="mb-8 max-w-2xl space-y-4">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-10 w-2/3" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                    <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                        {Array.from({ length: 4 }).map((_, i) => (
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
                </Container>
            </div>
        )
    }

    if (posts.length === 0) {
        return (
                        <div ref={homeRef} className="w-full py-10">
                <Container>
                                        <div className="glass-panel motion-sheen grid items-center gap-10 overflow-hidden rounded-[2rem] px-6 py-16 text-center sm:px-10 animate-scale-in lg:grid-cols-[1.05fr_0.95fr] lg:text-left">
                                            <div className="text-center lg:text-left">
                                            <p className="hero-eyebrow text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500">
                            Publishing dashboard
                        </p>
                                            <h1 className="hero-title mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl lg:mx-0">
                            A cleaner home for publishing, reviewing, and managing content.
                        </h1>
                                            <p className="hero-copy mx-auto mt-5 max-w-xl text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base lg:mx-0">
                            Sign in to manage posts or create a new article from the editor.
                        </p>
                                            <div className="hero-cta mt-8 flex justify-center gap-3 lg:justify-start">
                                                    <Button asChild>
                                                        <Link to={authStatus ? "/add-post" : "/login"}>
                                                            {authStatus ? "Create post" : "Sign in"}
                                                        </Link>
                                                    </Button>
                                                    <Button asChild variant="outline">
                                                        <Link to="/all-posts">Browse posts</Link>
                                                    </Button>
                                                </div>
                                            </div>
                                            <img src={heroIllustration} alt="" aria-hidden="true" className="mx-auto w-full max-w-md animate-soft-float" />
                    </div>
                </Container>
            </div>
        )
    }
    return (
                <div ref={homeRef} className='w-full py-10'>
            <Container>
                                <div data-reveal className='mb-8 max-w-2xl'>
                                                        <p className='text-xs font-semibold uppercase tracking-[0.24em] text-indigo-500'>Featured posts</p>
                                                                                                <h1 className='mt-3 text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-50 sm:text-5xl'>Latest stories from the team.</h1>
                                                                                                <p className='mt-4 text-sm leading-7 text-slate-500 dark:text-slate-400 sm:text-base'>Browse the most recent posts in a more editorial, recruiter-friendly layout.</p>
                                </div>
                                <div className='grid gap-6 sm:grid-cols-2 xl:grid-cols-4'>
                    {posts.map((post, index) => (
                                                                <div key={post.$id} data-reveal className='post-card-item h-full hover-lift'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home