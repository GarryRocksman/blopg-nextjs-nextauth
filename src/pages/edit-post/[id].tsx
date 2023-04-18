import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import EditPost from '../../components/EditPost';
import Layout from '../../components/layout';
import Head from 'next/head';
import { trpc } from '../../utils/trpc';
import type { Post } from '@prisma/client';

const EditPostPage: React.FC = () => {
  const [post, setPost] = React.useState<Post | null>(null);
  const router = useRouter();
  const { id } = router.query;

  const postToEdit = trpc.post.postById.useQuery(id as string);
  const updatePost = trpc.post.updatePost.useMutation();

  useEffect(() => {
    if (postToEdit.data !== undefined && postToEdit.data !== null) {
      setPost(postToEdit.data);
    }
  }, [postToEdit.data]);

  const handleUpdate = async (title: string, content: string) => {

    await updatePost.mutateAsync({ 
      id: parseInt(id as string), 
      title, 
      content
    });
    router.push(`/`);
  };

  return (
    <Layout>
      <Head>
        <title>{post?.title}</title>
      </Head>
    <div className="container mx-auto p-4 max-w-screen-lg">
      {post && <EditPost post={post} onUpdate={handleUpdate} /> }
    </div>
    </Layout>
  );
};

export default EditPostPage;