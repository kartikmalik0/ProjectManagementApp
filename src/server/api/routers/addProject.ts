import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const projectRouter = createTRPCRouter({
  createProject: publicProcedure
    .input(
      z.object({
        name: z.string(),
        categoryIds: z.array(z.string()),
        ownerId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.create({
        data: {
          name: input.name,
          categories: {
            connect: input.categoryIds.map((id) => ({ id })),
          },
          owner: {
            connect: { id: input.ownerId },
          },
        },
        include: {
          categories: true,
          owner: true,
        },
      });
      return project;
    }),
});
