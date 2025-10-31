import { useParams, useNavigate } from 'react-router-dom';
import { blogData } from './blogData';

const BlogPost = () => {
  const { slug } = useParams(); 
  const navigate = useNavigate();
  // Lógica para obtener el post correcto basado en el slug
  const post = blogData.find(post => post.slug === slug);
  const returnToBlog = () => {
    navigate('/blog');
  };
  return (
    <div style={{display: 'flex'}}>
     <div >
       <h2>{post.title}</h2>
      <p>{post.content}</p>
      <p>{post.author}</p>
     </div>
      <div>
        <button onClick={returnToBlog}>Volver al blog</button>
      </div>
    </div>
  );
};

export  {BlogPost};



