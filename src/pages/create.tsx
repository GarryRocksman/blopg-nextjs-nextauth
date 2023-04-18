import Head from "next/head";
import Layout from "../components/layout";
import CreatePost from "../components/CreatePost";


const Create = () => (
  <Layout>
    <Head>
      <title>Create a New Post</title>
    </Head>
    <div className="container mx-auto p-4 max-w-screen-lg">
      <CreatePost />
    </div>
  </Layout>
);

export default Create;
