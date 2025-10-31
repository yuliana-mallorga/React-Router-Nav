import React from 'react'

function LogoutPage() {

    const logout = (e) => {
    e.preventDefault();
    console.log("salir");
    console.log(e);
    
    
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