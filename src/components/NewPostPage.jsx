import { PostForm } from './PostForm';
import { useNavigate } from 'react-router-dom';

export function NewPostPage() {
  const navigate = useNavigate();
  return <PostForm mode="create" onSuccess={() => navigate('/blog')} />;
}