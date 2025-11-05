import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext'
import { adminList } from '../auth/adminList'

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = useCallback(({ username }) => {
    const isAdmin = Array.isArray(adminList) && adminList.includes(username)
    setUser({ username, isAdmin });
    navigate('/profile')
  }, [navigate])

  const logout = useCallback(() => {
    setUser(null);
    navigate('/')
  },[navigate])
  const auth = useMemo(() => ({ user, login, logout }), [user, login, logout])
  return (
    <AuthContext.Provider value={ auth }>
      {children}
    </AuthContext.Provider>
  )
}




