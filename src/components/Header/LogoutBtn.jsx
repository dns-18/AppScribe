import React from 'react'
import {useDispatch} from 'react-redux'
import authService from '../../appwrite/auth'
import {logout} from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button
    className='rounded-full border border-slate-200 bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all duration-150 hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-md dark:border-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-slate-200'
    onClick={logoutHandler}
    >Logout</button>
  )
}

export default LogoutBtn