import { useContext } from "react";
import { PostContext } from "./PostContext"
export function usePost() {
  const ctx = useContext(PostContext);
  if (!ctx) throw new Error('usePost debe ser usado si <PostProvider>')
  return ctx
}