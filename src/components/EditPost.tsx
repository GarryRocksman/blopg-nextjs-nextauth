import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from 'next/link';
import type { Post } from '@prisma/client';

import dynamic from 'next/dynamic';
const DynamicReactQuill = dynamic(() => import('react-quill'), {
  // Optional: provide a loading component for when the component is being loaded
  loading: () => <p>Loading editor...</p>,
  // Optional: set this to `true` if the component is a server-side rendered component
  ssr: false,
});

import 'react-quill/dist/quill.snow.css';

interface EditPostProps {
  post: Post,
  onUpdate: (title: string, content: string) => void;
}

type EditPostType = {
  title: string;
  content: string | null;
};

export const editPostSchema = z.object({
  title: z.string().min(1).max(500),
  content: z.string().min(1).max(10000),
});

const EditPost: React.FC<EditPostProps> = ({ post, onUpdate }) => {
  const { 
    register, 
    handleSubmit, 
    formState: {errors}, 
    control 
  } = useForm<EditPostType>({
    resolver: zodResolver(editPostSchema),
    defaultValues: {
      title: post.title,
      content: post.content,
    },
  });

  const onFormSubmit = (data: EditPostType) => {
    if(data.content === null) return;
    onUpdate(data.title, data.content);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <div className="flex items-center mb-4">
        {/* Back arrow button */}
        <Link className="p-2 mr-2" href="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h2 className="text-xl font-semibold">Edit Post</h2>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            className="w-full p-2 border"
            {
              ...register("title")
            }
          />
          <p className="mt-4 text-sm text-red-400">
            {errors.title?.message}
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="body" className="block mb-2 font-medium">
            Body
          </label>
          <Controller 
            name="content"
            control={control}
            render={({ field }) => (
              <DynamicReactQuill 
                {...field}
                theme="snow" 
                value={field.value|| ''} 
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          <p className="mt-4 text-sm text-red-400">
            {errors.content?.message}
          </p>
        </div>
        <button type="submit" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 mr-2 w-32 transition-colors text-center">
          Update
        </button>
        <Link type="button" className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 w-32 transition-colors text-center" href="/">
          Cancel
        </Link>
      </form>
    </div>
  );
};

export default EditPost;