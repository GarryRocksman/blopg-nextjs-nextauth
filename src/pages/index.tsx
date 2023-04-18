import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { trpc } from "../utils/trpc";
import Layout from "../components/layout";
import Button from "../components/Button";
import PostList from "../components/PostList";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import type { Post } from "@prisma/client";
import { useRouter } from 'next/router';
import Loader from "../components/Loader";
import BackToTop from "../components/BackToTop";

const Home: NextPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const { data: sessionData, status } = useSession();
  const isAuthenticated = status === "authenticated";
  let userId = sessionData?.user?.id;
  const router = useRouter();

  if (userId === undefined) {
    userId = '-1';
  }
  
  const userFromDatabase = trpc.user.userById.useQuery(userId);
  if (userFromDatabase.data?.nickname === null) {
    router.push('/registration');
  }

  const postsFromDatabase = trpc.post.allPosts.useQuery();

  useEffect(() => {
    if (postsFromDatabase.data) {
      setPosts(postsFromDatabase.data);
    }
  }, [postsFromDatabase.data]);
  
  return (
    <Layout>
        <Head>
          <title>B L O G</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="container mx-auto px-4 max-w-screen-lg">
          {isAuthenticated && (
            <div className='mt-6 mb-6'>
              <Button>
                <Link href={'/create'}>
                  Create Post
                </Link>
              </Button>
            </div>
          )}
          {!!posts?.length 
            ? <PostList posts={posts} />
            : <Loader />
          }
        </main>
        <BackToTop />
    </Layout>
  );
};

export default Home;


