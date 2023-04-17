import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';

import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { trpc } from '../utils/trpc';
import { useRouter } from 'next/router';

import dynamic from 'next/dynamic';
const DynamicReactQuill = dynamic(() => import('react-quill'), {
  // Optional: provide a loading component for when the component is being loaded
  loading: () => <p>Loading editor...</p>,
  // Optional: set this to `true` if the component is a server-side rendered component
  ssr: false,
});

import 'react-quill/dist/quill.snow.css';

type CreatePostType = {
  title: string;
  content: string;
};

export const createPostSchema = z.object({
  title: z.string().min(1).max(500),
  content: z.string().min(1).max(10000),
});

const CreatePost = () => {
  const router = useRouter();
  const { 
    register, 
    handleSubmit, 
    formState: {errors}, 
    control
  } = useForm<CreatePostType>({
    resolver: zodResolver(createPostSchema),
  });

  const createNewPost = trpc.post.createPost.useMutation();

  
  const onFormSubmit = async (data: CreatePostType) => {
    try {
      await createNewPost.mutateAsync(data);
      router.push('/');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };
  

  return (
    <div className="bg-white p-4 shadow">
      <div className="flex items-center mb-4">
        <Link className="p-2 mr-2" href="/">
          <FontAwesomeIcon icon={faArrowLeft} />
        </Link>
        <h2 className="text-xl font-semibold">Create New Post</h2>
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-4">
          <label htmlFor="title" className="block mb-2 font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            placeholder='Enter title...'
            className="w-full p-2 border outline-gray-400"
            {
              ...register("title")
            }
          />
          <p className="mt-4 text-sm text-red-400">
            {errors.title?.message}
          </p>
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block mb-2 font-medium">
            Body
          </label>
          <Controller 
            name="content"
            control={control}
            render={({ field }) => (
              <DynamicReactQuill 
                {...field}
                theme="snow" 
                value={field.value || ''} 
                onChange={(value) => field.onChange(value)}
              />
            )}
          />
          <p className="mt-4 text-sm text-red-400"> 
            {errors.content?.message}
          </p>
        </div>
        <button type="submit" className="bg-green-600 text-white px-4 py-2 hover:bg-green-700 transition-colors w-32">
          Save
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
