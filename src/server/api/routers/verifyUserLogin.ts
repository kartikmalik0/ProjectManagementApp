import { z } from "zod";
import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { verifyPassword } from "~/utils/password"; // Assumes you have a utility function to compare passwords

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
      console.log(input)
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
      console.log(isPasswordValid, "passowrd vlaid -----------")
      if (!isPasswordValid) {
        throw new Error("Invalid password");
      }

      // If the password is valid, return the user
      return user;
    }),
});
