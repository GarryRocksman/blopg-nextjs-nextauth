import { z } from 'zod';
import { 
  protectedProcedure, 
  publicProcedure, 
  router 
} from '../trpc';
import { createPostSchema } from '../../../components/CreatePost';


const postRouter = router({
  allPosts: publicProcedure.query(
    async ({ctx: {prisma}}) => {
      const posts = await prisma.post.findMany();
      return posts;
    }
  ),
  postById: publicProcedure.input(z.string()).query(
    async ({ctx: { prisma }, input }) => {
     try {
      const post = await prisma.post.findUnique({ where: { id: parseInt(input) } });
      return post;
     } catch (error) {
       console.log(error);
     }
    }
  ),
  createPost: protectedProcedure.input(
    createPostSchema
  ).mutation(
    async ({
      ctx: {prisma, session},
      input: { title, content }
      
    }) => {
      const newPost = await prisma.post.create({ data: {
        title: title,
        content: content,
        authorId: session?.user?.id,
      } });
      return newPost;
    }
  ),
  updatePost: protectedProcedure.input(z.object({
      id: z.number(),
      title: z.string().optional(),
      content: z.string().optional(),
  })).mutation(
    async ({
      ctx: { prisma },
      input: { id, title, content }
    }) => {
      const updatedPost = await prisma.post.update({
        where: { id: id },
        data: {
          title: title,
          content: content,
        },
      });
      return updatedPost;
    }
  ),
  deletePost: publicProcedure.input(z.object({
      id: z.number(),
  })).mutation(
    async ({  ctx: { prisma }, input }) => {
      const deletedPost = await prisma.post.delete({ where: { id: input.id } });
      return deletedPost;
    }
  )
})


export default postRouter;