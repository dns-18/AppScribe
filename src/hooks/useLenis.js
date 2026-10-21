import { useEffect } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { setLenis } from '../lib/lenis'

export function useLenis() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.15,
      smoothWheel: true,
    })

    setLenis(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    const rafFn = (time) => {
      lenis.raf(time * 1000)
    }

    gsap.ticker.add(rafFn)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(rafFn)
      lenis.destroy()
      setLenis(null)
    }
  }, [])
}
