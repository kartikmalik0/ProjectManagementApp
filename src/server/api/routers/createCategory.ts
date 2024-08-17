import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  addCategory: publicProcedure
    .input(
      z.object({
        name: z.string().min(1), // Ensure name is a non-empty string
      })
    )
    .mutation(async ({ ctx, input }) => {
        console.log(input,"------------")
      const category = await ctx.db.category.create({
        data: {
          name: input.name,
        },
      });

      return category;
    }),
});
