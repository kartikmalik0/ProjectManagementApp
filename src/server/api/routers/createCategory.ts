import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "~/server/api/trpc";

export const categoryRouter = createTRPCRouter({
  addCategory: publicProcedure
    .input(
      z.object({
        name: z.string().min(1), // Ensure name is a non-empty string
      })
    )
    .mutation(async ({ ctx, input }) => {
      const category = await ctx.db.category.create({
        data: {
          name: input.name,
        },
      });

      return category;
    }),


    fetchCategories: protectedProcedure.query(async ({ ctx }) => {
      const categories = await ctx.db.category.findMany();
      return categories;
    }),
  

});
