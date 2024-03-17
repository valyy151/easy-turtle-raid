import { z } from "zod";

import {
  createTRPCRouter,
  adminProcedure,
  publicProcedure,
} from "@/server/api/trpc";

export const bossRouter = createTRPCRouter({
  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return await ctx.db.boss.findUnique({
      where: { id: input },
      select: {
        id: true,
        name: true,
        imageURL: true,
        tactics: { select: { dps: true, tank: true, heal: true } },
      },
    });
  }),
  // update boss tactics or create new tactics if they don't exist
  updateTactics: adminProcedure
    .input(
      z.object({
        id: z.string(),
        dps: z.string(),
        tank: z.string(),
        heal: z.string(),
        imageURL: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      if (input.imageURL) {
        await ctx.db.boss.update({
          where: { id: input.id },
          data: { imageURL: input.imageURL },
        });
      }

      return await ctx.db.tactics.upsert({
        where: { bossId: input.id },
        update: {
          dps: input.dps,
          tank: input.tank,
          heal: input.heal,
        },
        create: {
          bossId: input.id,
          dps: input.dps,
          tank: input.tank,
          heal: input.heal,
        },
      });
    }),

  create: adminProcedure
    .input(
      z.object({
        id: z.string(),
        raidId: z.string(),
        name: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.boss.create({
        data: {
          id: input.id,
          name: input.name,
          raidId: input.raidId,
        },
      });
    }),
});
