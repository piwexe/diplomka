import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { Context } from "../index";

const RequireAuth = ({children}) => {
    const {user} = useContext(Context)
    if (!user.isAuth) {
        return <Navigate to='/login' />
    }
  return children;
}

export {RequireAuth};