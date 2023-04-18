import React from 'react';
import Image from 'next/image';
import AuthShowcase from './AuthShowcase';
import Link from 'next/link';

const Header: React.FC = () => (
  <header className="bg-gray-200 p-4 flex justify-between items-center">
    <Link href="/">
      <Image src="/images/blog.png" alt="Logo" className="w-16 h-16" width={100} height={100}/>
    </Link>
    <AuthShowcase />
  </header>
);

export default Header;