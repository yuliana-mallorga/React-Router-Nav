import React from 'react'
import useAuth  from "./auth/useAuth";


function LogoutPage() {
    const auth = useAuth()
    const logout = (e) => {
    e.preventDefault();
    auth.logout()
    console.log('salio', auth.user);
    
  }
  return (
    <>
    <h1>Logout</h1>
    <form 
    style={{display:"flex", flexDirection: "column", gap:"1rem"}}
    onSubmit={logout}
    >
      <label htmlFor="logout">Estas seguro de que quieres salir?</label>
     
      <button type="submit">Salir</button>
    </form>
    </>
  )
}

export {LogoutPage}