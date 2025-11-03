import React from "react";
import { AuthContext } from "./AuthContext";

export default function useAuth() {
  const auth = React.useContext(AuthContext);
  if (!auth) throw new Error('useAuth debe usarse dentro de <AuthProvider>');
  return auth
}