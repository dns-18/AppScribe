// MECHANISM TO PROTECT ROUTES OR PAGES FROM UNAUTHORIZED ACCESS

import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

export default function Protected({children, authentication = true}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector(state => state.auth.status)

    useEffect(() => {
        //TODO: make it more easy to understand

        // if (authStatus ===true){
        //     navigate("/")
        // } else if (authStatus === false) {
        //     navigate("/login")
        // }
        
        //let authValue = authStatus === true ? true : false

        if(authentication && authStatus !== authentication){
            navigate("/login")
        } else if(!authentication && authStatus !== authentication){
            navigate("/")
        }
        setLoader(false)
    }, [authStatus, navigate, authentication])

    return loader ? (
        <div className="flex min-h-[60vh] items-center justify-center px-4">
            <div className="glass-panel rounded-2xl px-6 py-4 text-sm font-medium text-slate-600">
                Loading...
            </div>
        </div>
    ) : <>{children}</>
}
