import React, { useCallback, useEffect, useRef, useState } from "react";

function LoginPage() {
  const [username, setUsername] = useState("");
  const usernameRef = useRef(username);

  useEffect(() => {
    usernameRef.current = username;
  }, [username]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    console.log("entrar", usernameRef.current);
  }, []);

  return (
    <>
      <h1>Login</h1>
      <form
        style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Escribe tu nombre de usuario</label>
        <input
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

export { LoginPage };
