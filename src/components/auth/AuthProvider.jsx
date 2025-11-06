import React, { useState, useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from './AuthContext'
import { adminList } from './roleList'
import { editorList } from './roleList'
import { betaTesterList } from './roleList';

export function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  const login = useCallback(({ username }) => {
    const isAdmin = Array.isArray(adminList) && adminList.includes(username)
    const isEditor = Array.isArray(editorList) && editorList.includes(username)
    const isBetaTester = Array.isArray(betaTesterList) && betaTesterList.includes(username)
    setUser({ username, isAdmin, isEditor, isBetaTester });   
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




