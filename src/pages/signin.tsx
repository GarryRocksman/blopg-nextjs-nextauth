import Head from "next/head";
import Layout from "../components/layout";
import AuthForm from "../components/AuthForm";
import type { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import { getProviders, signIn } from "next-auth/react";
import { getServerSession } from "next-auth/next";
import { authOptions } from "./api/auth/[...nextauth]";

export default function Signin({ providers }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <Layout>
      <Head>
        <title>Sign in</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen overflow-x-hidden">
        <AuthForm>
          {Object.values(providers).map((provider) => (
            <div key={provider.name}>
              <button 
                type="button"
                className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-500 transition-colors w-full"
                onClick={() => signIn(provider.id)}
                >
                Sign in with {provider.name}
              </button>
            </div>
          ))}
        </AuthForm>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getServerSession(context.req, context.res, authOptions);

  // If the user is already logged in, redirect.
  // Note: Make sure not to redirect to the same page
  // To avoid an infinite loop!
  if (session) {
    return { redirect: { destination: "/" } };
  }

  const providers = await getProviders();

  return {
    props: { providers: providers ?? [] },
  };
}
