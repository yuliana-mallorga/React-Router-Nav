import { useParams, useNavigate } from "react-router-dom";
import { blogData } from "./blogData";
import useAuth from "./auth/useAuth";
const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  // Lógica para obtener el post correcto basado en el slug
  const post = blogData.find((post) => post.slug === slug);
  const {user} = useAuth();
  
  if(!post){
    return (
      <div>
        <p>Post no escontrado</p>
        <button onClick={()=> navigate("/blog")}>volver al blog</button>
      </div>

    )
  }
  const username = user?.username ?? ""
  const authors = Array.isArray(post.author) ? post.author : [post.author]
  const hasUser = username.trim().length > 0
  const isAuthorOfThisPost = hasUser && authors.includes(username)

  const canDelete = Boolean(user?.isAdmin || isAuthorOfThisPost)
  
  const returnToBlog = () => {
    navigate("/blog");
  };

  const handleDelete = () => {
    if(!canDelete) return;
    console.log("eliminar post:", post.slug);
    navigate("./blog")
  }
  return (
    <div style={{ display: "flex" }}>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>{post.author}</p>
      </div>
      <div>
        <button onClick={returnToBlog}>Volver al blog</button>
        {canDelete ? (
          <button type="button" onClick={handleDelete}>eliminar el blog</button>
        ) : (
          <div style={{ display: "none" }}></div>
        )}
      </div>
    </div>
  );
};

export { BlogPost };
