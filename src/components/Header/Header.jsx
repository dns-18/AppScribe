// import React from 'react'
// import {Container, Logo, LogoutBtn} from '../index'
// import { Link } from 'react-router-dom'
// import {useSelector} from 'react-redux'
// import { useNavigate } from 'react-router-dom'


// export default function Logo({ width = "200px" }) {
//   return (
//     <svg width={width} viewBox="0 0 240 48" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <polygon points="4,40 22,4 40,40 22,28" fill="#1a1a2e"/>
//       <polygon points="22,28 40,40 22,36" fill="#6C8EF5"/>
//       <line x1="22" y1="36" x2="22" y2="44" stroke="#6C8EF5" strokeWidth="2" strokeLinecap="round"/>
//       <text x="52" y="33" fontFamily="-apple-system, sans-serif" fontSize="21" fontWeight="600" fill="#1a1a2e">
//         App<tspan fontWeight="400" fill="#6C8EF5">Scribe</tspan>
//       </text>
//     </svg>
//   )
// }
// function Header() {
//   const authStatus = useSelector((state) => state.auth.status)
//   const navigate = useNavigate()

//   const navItems = [
//     {
//       name: 'Home',
//       slug: "/",
//       active: true
//     }, 
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//   },
//   {
//       name: "Signup",
//       slug: "/signup",
//       active: !authStatus,
//   },
//   {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//   },
//   {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//   },
//   ]


//   return (
//     <header className='py-3 shadow bg-gray-500'>
//       <Container>
//         <nav className='flex'>
//           <div className='mr-4'>
//             <Link to='/'>
//               <Logo width='70px'   />

//               </Link>
//           </div>
//           <ul className='flex ml-auto'>
//             {navItems.map((item) => 
//             item.active ? (
//               <li key={item.name}>
//                 <button
//                 onClick={() => navigate(item.slug)}
//                 className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
//                 >{item.name}</button>
//               </li>
//             ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//         </Container>
//     </header>
//   )
// }

// export default Header

import React from 'react'
import { Container, Logo, LogoutBtn } from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../ui/theme-toggle'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const navItems = [
    { name: 'Home',      slug: '/',          active: true },
    { name: 'Login',     slug: '/login',     active: !authStatus },
    { name: 'Signup',    slug: '/signup',    active: !authStatus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus },
    { name: 'Add Post',  slug: '/add-post',  active: authStatus },
  ]

  return (
    <header className="sticky top-0 z-40 border-b border-white/70 bg-white/80 backdrop-blur-xl shadow-[0_8px_30px_rgba(15,23,42,0.06)] dark:border-slate-800/80 dark:bg-slate-950/75 dark:shadow-[0_8px_30px_rgba(0,0,0,0.25)] animate-fade-up">
      <Container>
        <nav className="flex items-center py-4">

          <div className="mr-6 shrink-0">
            <Link to="/">
              <Logo width="132px" />
            </Link>
          </div>

          <ul className="ml-auto flex flex-wrap items-center justify-end gap-2">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="rounded-full px-4 py-2 text-sm font-medium text-slate-600 transition-all duration-150 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white hover-lift"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            <li>
              <ThemeToggle />
            </li>
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header