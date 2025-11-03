import React, { useCallback, useEffect, useRef, useState } from "react";
import useAuth  from "./auth/useAuth";

function LoginPage() {
  const auth = useAuth();
  const [username, setUsername] = useState("");
  const usernameRef = useRef(username);

  useEffect(() => {
    usernameRef.current = username;
  }, [username]);

  const handleSubmit = useCallback((e) => {
    e.preventDefault();
    auth.login({username})
  }, [username, auth]);

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
