import { raidRouter } from "@/server/api/routers/raid";
import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { bossRouter } from "./routers/boss";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  raid: raidRouter,
  boss: bossRouter,

  deleteAccount: protectedProcedure.mutation(async ({ ctx }) => {
    return await ctx.db.user.delete({
      where: {
        id: ctx.session.user.id,
      },
    });
  }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
