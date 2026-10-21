import cover1 from '../assets/covers/cover-1.svg'
import cover2 from '../assets/covers/cover-2.svg'
import cover3 from '../assets/covers/cover-3.svg'

export const covers = [cover1, cover2, cover3]

export function pickCover(seed = '') {
  let h = 0
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0
  }
  return covers[h % covers.length]
}
