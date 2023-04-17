import React from 'react';
import Image from 'next/image';

type AuthFormProps = {
  children: React.ReactNode;
}

const AuthForm: React.FC<AuthFormProps> = ({ children }) => {

  return (
    <div className="bg-white p-4 shadow w-96">
      <div className="flex justify-center mb-4">
        <Image src="/images/blog.png" alt="Logo" className="w-24 h-24" width={100} height={100}/>
      </div>
      {children}
    </div>
  );
};

export default AuthForm;