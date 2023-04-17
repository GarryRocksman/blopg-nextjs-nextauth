import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

const AuthShowcase: React.FC = () => {
  const { data: sessionData } = useSession();

  return (
    <div className="flex items-center space-x-2">
      {sessionData?.user?.image && (
        <Image
          src={sessionData.user.image}
          alt="User profile"
          className="rounded-full mr-4"
          width={32}
          height={32}
        />
      )}
      <button
        className="bg-gray-600 text-white px-4 py-2 hover:bg-gray-500 transition-colors duration-300"
        onClick={sessionData ? () => signOut() : () => signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
};

export default AuthShowcase;