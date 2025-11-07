import { usePost } from "./post/usePost";
import React, {useEffect}  from 'react'


export function PostForm({ mode = 'create', targetIdOrSlug = null, onSuccess }) {
  const { draft, setDraftField, createPost, updatePost, loadDraftFromPost, clearDraft } = usePost();

  // Si es edición, cargar el borrador al montar
  useEffect(() => {
    if (mode === 'edit' && targetIdOrSlug) {
      loadDraftFromPost(targetIdOrSlug);
    } else if (mode === 'create') {
      clearDraft();
    }
  }, [mode, targetIdOrSlug, loadDraftFromPost, clearDraft]);

  function handleSubmit(e) {
    e.preventDefault();
    const ok = mode === 'create' ? createPost() : updatePost(targetIdOrSlug);
    if (ok && onSuccess) onSuccess();
  }

  const disabled = !draft.title.trim() || draft.content.trim().length < 10 || !draft.author.trim();

  return (
    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 8, maxWidth: 520 }}>
      <label>
        Title
        <input
          value={draft.title}
          onChange={(e) => setDraftField('title', e.target.value)}
        />
      </label>

      <label>
        Content
        <textarea
          rows={6}
          value={draft.content}
          onChange={(e) => setDraftField('content', e.target.value)}
        />
      </label>

      <label>
        Author
        <input
          value={draft.author}
          onChange={(e) => setDraftField('author', e.target.value)}
        />
      </label>

      <button type="submit" disabled={disabled}>
        {mode === 'create' ? 'Publish' : 'Save changes'}
      </button>
    </form>
  );
}

