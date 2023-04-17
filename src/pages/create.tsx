import Head from "next/head";
import Layout from "../components/layout";
import CreatePost from "../components/CreatePost";


export default function Create() {
  return (
    <Layout>
      <Head>
        <title>Create a New Post</title>
      </Head>
      <div className="container mx-auto p-4">
        <CreatePost />
      </div>
    </Layout>
  );
};