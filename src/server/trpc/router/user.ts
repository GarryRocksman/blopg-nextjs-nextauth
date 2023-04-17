import { z } from 'zod';
import { 
  protectedProcedure, 
  publicProcedure, 
  router 
} from '../trpc';
import { registrationFromSchema } from '../../../components/RegistrationForm';

const userRouter = router({
  allusers: publicProcedure.query(
    async ({ctx: {prisma}}) => {
      const users = await prisma.user.findMany();
      return users;
    }
  ),
  userById: publicProcedure.input(z.string()).query(
    async ({ctx: { prisma }, input }) => {
      const user = await prisma.user.findUnique({ where: { id: input } });
      return user;
    }
  ),
  updateuser: protectedProcedure.input(
    registrationFromSchema
  ).mutation(
    async ({
      ctx: { prisma, session },
      input: { nickname, phone, city }
    }) => {
      const updateduser = await prisma.user.update({
        where: { id: session?.user?.id },
        data: {
          nickname,
          phone,
          city,
        },
      });
      return updateduser;
    }
  ),
  deleteuser: protectedProcedure.input(z.object({
      id: z.string(),
  })).mutation(
    async ({ctx: { prisma }, input }) => {
      const deleteduser = await prisma.user.delete({ where: { id: input.id } });
      return deleteduser;
    }
  )
})


export default userRouter;