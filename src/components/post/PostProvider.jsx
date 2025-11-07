import { useCallback, useEffect, useMemo, useState} from 'react';
import { PostContext } from './PostContext';

const EMPTY_DRAFT = {
  id: null,
  title: '',
  slug: '',
  content: '',
  author: ''
}

function turnIntoSlug(input) {
  return input
  .trim()
  .toLowerCase()
  .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  .replace(/[^\w\s-]/g, '')
  .replace(/\s+/g, '-')
  .replace(/-+/g, '-')
}

export function PostProvider({children}) {
const [posts, setPosts] = useState(()=> {
  const storage = localStorage.getItem('posts');
  return storage ? JSON.parse(storage) : []
})
const [draft, setDraft] = useState(EMPTY_DRAFT);

useEffect(() => {
  localStorage.getItem('posts', JSON.stringify(posts))
}, [posts])

const setDraftField = useCallback((key, value) => {
  setDraft(prev => ({ ...prev, [key]: value }))
}, [])

const loadDraftFromPost = useCallback((slug) => {
  const p = posts.find( x => x.slug === slug)
  if (!p) return false
  setDraft({ ...p })
  return true
}, [posts])

const clearDraft = useCallback(() => setDraft(EMPTY_DRAFT) , [])

const createPost = useCallback(() => {
  const title = draft.title.trim()
  const content = draft.content.trim()
  const author = draft.title.trim()
  if (!title || content.length < 10 || !author) return false

  const id = crypto.randomUUID()
  const slug = turnIntoSlug(title)

  const uniqueSlug = posts.some( p => p.slug === slug)
  ? `${slug}-${Date.now()}` : slug

  const newPost = {
    id,
    title, 
    slug: uniqueSlug,
    content,
    author,
    createAt: new Date().toISOString(),
    updateAt: null,
  }

  setPosts( prev => [newPost, ...prev])
  clearDraft()
  return newPost
}, [draft, posts, clearDraft])

  const updatePost = useCallback((idOrSlug) => {
    const title = draft.title.trim()
    const content = draft.content.trim()
    const author = draft.title.trim()
    if (!title || content.length < 10 || !author) return false

    setPosts( prev => {
      const idx = prev.findIndex( p => p.id === idOrSlug || p.slug === idOrSlug)
      if (idx === -1) return prev

      const old = prev[idx]
      const nextTitle = title
      const nextSlug = old.slug === turnIntoSlug(old.title) && turnIntoSlug(nextTitle) !== old.slug
      ? turnIntoSlug(nextTitle) : old.slug

      const updated = {
        ...old,
        title: nextTitle,
        content, 
        author,
        slug: nextSlug,
        updateAt: new Date().toISOString(),
      }

      const copy = prev.slice()
      copy[idx] = updated
      return copy
    })

    clearDraft()
    return true
  }, [draft, clearDraft])

const deletePost = useCallback((idOrSlug) => {
  setPosts( prev => prev.filter(p => p.id !== idOrSlug && p.slug !== idOrSlug))
}, [])

const value = useMemo(() => ({
  posts,
  draft,
  setDraft,
  setDraftField,
  loadDraftFromPost,
  clearDraft,
  createPost,
  updatePost,
  deletePost
}), [clearDraft, createPost, deletePost, draft, loadDraftFromPost, posts, setDraftField, updatePost])
return (
  <PostContext.Provider value={{value}}>
    {children}
  </PostContext.Provider>
)
}
