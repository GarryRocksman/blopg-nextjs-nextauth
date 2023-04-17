import React from 'react';
import Head from 'next/head';
import Link from 'next/link';

const Custom404 = () => {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div className="min-h-screen flex items-center justify-center bg-gray-600">
        <div className="text-center">
          <h1 className="text-6xl font-semibold text-gray-400">404</h1>
          <p className="text-2xl text-gray-400">Page not found</p>
          <button className="mt-10 text-gray-400 border-gray-400 border-2 px-4 py-2 rounded transition-colors hover:bg-gray-600 hover:text-gray-200">
            <Link href="/" className="text-2xl text-gray-400">Go back to homepage</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default Custom404;
