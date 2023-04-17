import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";

interface RegistrationFormProps {
  onSubmit: (nickname: string,  phone: string,city: string) => void;
}

type RegistrationFormType = {
  nickname: string;
  phone: string;
  city: string;
};

export const registrationFromSchema = z.object({
  nickname: z.string().min(1).max(20),
  phone: z.string().min(10).max(20),
  city: z.string().min(1).max(20),
});

const  RegistrationForm:React.FC <RegistrationFormProps> = ({ onSubmit }) => {
  const router = useRouter();
  const { data: sessionData } = useSession();
  
  const { register, handleSubmit, formState: {errors} } = useForm<RegistrationFormType>({
    resolver: zodResolver(registrationFromSchema),
  });
  


  const onFormSubmit = (data: RegistrationFormType) => {
    onSubmit(data.nickname, data.phone, data.city);
    router.push('/');
  };

  return (
    <div className="bg-white p-4 shadow w-96">
      <div className="flex justify-center mb-4">
      {sessionData?.user?.image && (
        <Image
          src={sessionData.user.image}
          alt="User profile"
          className="rounded-full mr-4"
          width={100}
          height={100}
        />
      )}
      </div>
      <form onSubmit={handleSubmit(onFormSubmit)}>
        <div className="mb-4">
          <label htmlFor="lastName" className="block mb-2 font-medium">
            Nickname
          </label>
          <input
            type="text"
            id="nickname"
            className="w-full p-2 border outline-gray-400"
            {
              ...register("nickname")
            }
          />
          <p className="mt-4 text-sm text-red-400">
            {errors.nickname?.message}
          </p>
        </div>
        <div className="mb-2">
          <label htmlFor="phone" className="block mb-2 font-medium">
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            className="w-full p-2 border outline-gray-400"
            {
              ...register("phone")
            }
          />
          <p className="mt-4 text-sm text-red-400">
            {errors.phone?.message}
          </p>
        </div>
        <div className="mb-2">
          <label htmlFor="city" className="block mb-2 font-medium">
            City
          </label>
          <input
            type="text"
            id="city"
            className="w-full p-2 border outline-gray-400"
            {
              ...register("city")
            }
          />
          <p className="mt-2 text-sm text-red-400">
            {errors.city?.message}
          </p>
        </div>
        <button
          type="submit"
          className="bg-gray-600 hover:bg-gray-500 text-white px-4 py-2 w-full transition-colors duration-300"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default RegistrationForm;