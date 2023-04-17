import { Post } from '@prisma/client';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React from 'react';

import { Markup } from 'interweave';

interface PostProps {
  post: Post
}

const Post: React.FC<PostProps> = ({ post }) => {
  const { id, title, content, authorId } = post;
  const { data: sessionData} = useSession();
  const editable = sessionData?.user?.id === authorId;
  
  return (
    <div className="bg-white p-12 my-4 shadow">
      <div className='flex justify-between items-center'>
        <h3 className="text-xl font-bold">
          {title} 
        </h3>
        {editable &&
           <Link href={`/edit-post/${id}`} className='outline  outline-2 outline-gray-600  px-4 py-1 hover:bg-gray-100 transotion-color duration-300'>
              Edit
           </Link>
        }
      </div>
      <div className="w-full h-[1px] bg-gray-300 my-8"></div>
      <div className='prose prose-base max-w-full'>
        <Markup content={content} />
      </div>
    </div>
  );
};

export default Post;