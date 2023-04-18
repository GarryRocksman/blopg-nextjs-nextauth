import Head from "next/head";
import Layout from "../components/layout";
import RegistrationForm from "../components/RegistrationForm";
import { trpc } from "../utils/trpc";
import { useRouter } from "next/router";


const  Registration = () => {
  const router = useRouter();
  const updateUser = trpc.user.updateuser.useMutation();

  const handleRegistration = async (nickname: string, phone: string, city: string) => {
    try {
      await updateUser.mutateAsync({nickname, phone, city});
      router.push('/');
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Registration</title>
      </Head>
      <div className="flex items-center justify-center min-h-screen overflow-x-hidden">
        <RegistrationForm onSubmit={handleRegistration} />
      </div>
    </Layout>
  );
}

export default Registration;