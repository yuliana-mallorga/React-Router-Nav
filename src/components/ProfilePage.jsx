import React from "react";
import useAuth from "./auth/useAuth";

function ProfilePage() {
  const auth = useAuth();

  return (
    <>
      <h1>ProfilePage</h1>
      <h2>Bienvenido/a {auth.user?.username}</h2>
    </>
  );
}

export { ProfilePage };
