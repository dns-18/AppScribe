import React from 'react'
import { Container, Logo } from '../index'
import { Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { ThemeToggle } from '../ui/theme-toggle'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback } from '../ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import { Home as HomeIcon, LogIn, UserPlus, BookOpen, PenLine, LogOut } from 'lucide-react'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const userData = useSelector((state) => state.auth.userData)
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useDispatch()

  const navItems = [
    { name: 'Home',      slug: '/',          active: true,          icon: HomeIcon },
    { name: 'Login',     slug: '/login',     active: !authStatus,   icon: LogIn },
    { name: 'Signup',    slug: '/signup',    active: !authStatus,   icon: UserPlus },
    { name: 'All Posts', slug: '/all-posts', active: authStatus,    icon: BookOpen },
    { name: 'Add Post',  slug: '/add-post',  active: authStatus,    icon: PenLine },
  ]

  const initialsSource = userData?.name?.trim() || userData?.email?.split('@')[0] || 'U'
  const initials =
    initialsSource
      .split(/[\s._-]+/)
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0])
      .join('')
      .toUpperCase() || 'U'

  const logoutHandler = () => {
    authService.logout().then(() => {
      dispatch(logout())
    })
  }

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
            {navItems.map((item) => {
              if (!item.active) return null
              const Icon = item.icon
              const isCurrent = location.pathname === item.slug
              return (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all duration-150 hover-lift ${
                      isCurrent
                        ? 'bg-slate-100 text-slate-950 dark:bg-slate-800 dark:text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </button>
                </li>
              )
            })}
            <li>
              <ThemeToggle />
            </li>
            {authStatus && (
              <li>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="rounded-full">
                      <Avatar className="h-9 w-9">
                        <AvatarFallback className="bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-200">
                          {initials}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="truncate text-sm font-medium leading-none">
                          {userData?.name || 'Account'}
                        </p>
                        <p className="truncate text-xs leading-none text-muted-foreground">
                          {userData?.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/all-posts')}>
                      <BookOpen className="h-4 w-4" />
                      All Posts
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate('/add-post')}>
                      <PenLine className="h-4 w-4" />
                      Add Post
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logoutHandler}>
                      <LogOut className="h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </li>
            )}
          </ul>

        </nav>
      </Container>
    </header>
  )
}

export default Header
