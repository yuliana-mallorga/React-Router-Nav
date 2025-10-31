import React from 'react';
import { Link } from 'react-router-dom';
import  { blogData }  from './blogData';

function BlogLink() {
  return  blogData.map((post)=> (
      <li key={post.slug}>
        <Link to= {`/blog/${post.slug}`} > {post.title}  </Link>
      </li>
    )
  )
}

function BlogPage() {
  return (
    <>
      <h1>BlogPage</h1>
      <ul>
        <BlogLink  />
      </ul>
    </>
  );
}






export { BlogPage };