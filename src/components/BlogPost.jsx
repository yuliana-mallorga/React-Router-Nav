import { useParams, useNavigate } from "react-router-dom";
import { blogData } from "./blogData";
import useAuth from "./auth/useAuth";
import { useState } from "react";

const BlogPost = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  const post = blogData.find((post) => post.slug === slug);
  const { user } = useAuth();

  if (!post) {
    return (
      <div>
        <p>Post no escontrado</p>
        <button onClick={() => navigate("/blog")}>volver al blog</button>
      </div>
    );
  }
  const username = user?.username ?? "";
  const authors = Array.isArray(post.author) ? post.author : [post.author];
  const hasUser = username.trim().length > 0;
  const isAuthorOfThisPost = hasUser && authors.includes(username);

  const canDelete = Boolean(user?.isAdmin || isAuthorOfThisPost);
  const canEdit = Boolean(
    user?.isAdmin || user?.isEditor || isAuthorOfThisPost
  );
  const canComment = Boolean(user?.isBetaTester);

  const returnToBlog = () => {
    navigate("/blog");
  };

  const handleDelete = () => {
    if (!canDelete) return;
    console.log("eliminar post:", post.slug);
    navigate("/blog");
  };

  const handleEdit = () => {
    if (!canEdit) return;
    console.log("editar el post: ", post.slug);
  };

  const handleComment = () => {
    if (!canComment) return;
    const value = comment.trim();
    if (!value) return;

    setComments((prev) => [...prev, value]);
    setComment("");
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      <div>
        <h2>{post.title}</h2>
        <p>{post.content}</p>
        <p>{post.author}</p>
      </div>
      <div>
        <button onClick={returnToBlog}>Volver al blog</button>
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        {canEdit && (
          <button type="button" onClick={handleEdit}>
            Editar el blog
          </button>
        )}
         {canDelete && (
          <button type="button" onClick={handleDelete}>
            Eliminar el blog
          </button>
        )}
      </div>
      {canComment && (
        <div style={{ margin: "10px" }}>
          <input
            maxLength={100}
            value={comment}
            style={{ padding: "10px" }}
            aria-label="new comment"
            onChange={(e) => setComment(e.target.value)}
          />
          <button type="submit" onClick={handleComment}>
            Enviar
          </button>
          <ul>
            {comments.length > 0 &&
              comments.map((comment, idx) => {
                return (
                  <li key={idx}>
                    {" "}
                    <p>{comment}</p>{" "}
                  </li>
                );
              })}
          </ul>
        </div>
      )}
    </div>
  );
};

export { BlogPost };
