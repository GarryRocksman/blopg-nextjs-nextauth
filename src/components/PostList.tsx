import React from 'react';
import Post from './Post';
import type { Post as PostFromDB } from '@prisma/client';


interface PostListProps {
  posts: PostFromDB[];
}

const PostList: React.FC<PostListProps> = ({ posts }) => (
  <div className="mt-4">
    {posts.map((post) => (
      <Post key={post.id} post={post} />
    ))}
  </div>
);

export default PostList;