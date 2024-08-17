// src/server/api/trpc.ts
import { createTRPCRouter, createCallerFactory, publicProcedure } from "~/server/api/trpc";
import { postRouter } from "./routers/post";
import { registerRouter } from "./routers/register";
import { verifyUserRouter } from "./routers/verifyUserLogin";
import { categoryRouter } from "./routers/createCategory";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  post: postRouter,
  register: registerRouter,
  verifyUser: verifyUserRouter,
  createCategory: categoryRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
