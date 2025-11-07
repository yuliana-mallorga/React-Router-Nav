import { PostForm } from './PostForm';
import { useParams, useNavigate } from 'react-router-dom';

export function EditPostPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  return <PostForm mode="edit" targetIdOrSlug={slug} onSuccess={() => navigate(`/blog/${slug}`)} />;
}