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
    <div className="bg-white p-4 my-2 shadow prose prose-base max-w-full">
      <div className='flex justify-between items-center'>
        <h3 className="text-xl font-bold mb-2">
          {title} 
        </h3>
        {editable &&
           <Link href={`/edit-post/${id}`} className='outline  outline-2 outline-gray-600  px-4 py-1'>
              Edit
           </Link>
        }
      </div>
      <div className="w-full h-[1px] bg-gray-300 my-4"></div>
      <Markup content={content} />
    </div>
  );
};

export default Post;