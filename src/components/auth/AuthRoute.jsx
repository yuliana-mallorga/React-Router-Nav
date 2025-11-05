import React from 'react'
import { Navigate } from 'react-router-dom'
import useAuth from './useAuth'

export function AuthRoute(props) {
  const auth = useAuth()
  if(!auth.user){
  return  <Navigate to= '/login' />
  }
  return props.children;
}

  