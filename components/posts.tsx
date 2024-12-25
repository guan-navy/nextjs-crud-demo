"use client"
import { formatDate } from '@/lib/format';
import LikeButton from './like-icon';
import { togglePostLikeStatus } from '@/action/post';
import { useOptimistic } from 'react';

// 表单item
function Post({ post,action }) {
  
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{' '}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form action={action.bind(null,post.id)} className={post.isLiked ? 'liked' : ''}>
            <LikeButton />

            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

export default function Posts({ posts }) {
  const [optimisticPosts, updateOptimisticPosts] = useOptimistic(
    posts || [],
    (prevPosts, updatedPostId) => {
      if (!prevPosts) return [];
      
      const updatedPostIndex = prevPosts.findIndex((post) => post.id === updatedPostId);
      if (updatedPostIndex === -1) {
        return prevPosts;
      }
      
      const updatePost = { ...prevPosts[updatedPostIndex] };
      updatePost.likes = updatePost.likes + (updatePost.isLiked ? -1 : 1);
      updatePost.isLiked = !updatePost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndex] = updatePost;
      return newPosts;
    }
  );

  const displayPosts = optimisticPosts.length > 0 ? optimisticPosts : posts;

  if (!displayPosts || displayPosts.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  async function  updatePost(postId){
    updateOptimisticPosts(postId)
    await togglePostLikeStatus(postId)

  }
  return (
    <ul className="posts">
      {displayPosts.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePost}/>
        </li>
      ))}
    </ul>
  );
}
