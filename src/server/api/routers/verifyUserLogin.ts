import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { verifyPassword } from "~/utils/password"; 

export const verifyUserRouter = createTRPCRouter({
  getUserByEmailAndPassword: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string().min(8),
      }),
    )
    .query(async ({ ctx, input }) => {
      // Find the user by email
      const user = await ctx.db.user.findUnique({
        where: { email: input.email },
      });

      if (!user) {
        throw new Error("User not found");
      }

      // Compare the provided password with the stored hashed password
      const isPasswordValid = await verifyPassword(
        input.password,
        user.password,
      );
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // If the password is valid, return the user
      return user;
    }),
});
