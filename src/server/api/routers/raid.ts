import { z } from "zod";

import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "@/server/api/trpc";

export const raidRouter = createTRPCRouter({
  create: adminProcedure
    .input(
      z.object({
        id: z.string().min(1),
        name: z.string().min(1),
        type: z.string().min(2),
        isTurtle: z.boolean(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.raid.create({
        data: {
          id: input.id,
          name: input.name,
          type: input.type,
          isTurtle: input.isTurtle,
        },
      });
    }),

  getAll: publicProcedure.query(async ({ ctx }) => {
    const [tenManRaids, twentyManRaids, fortyManRaids] = await Promise.all([
      ctx.db.raid.findMany({
        where: { type: "10" },
        orderBy: { createdAt: "asc" },
      }),
      ctx.db.raid.findMany({
        where: { type: "20" },
        orderBy: { createdAt: "asc" },
      }),
      ctx.db.raid.findMany({
        where: { type: "40" },
        orderBy: { createdAt: "asc" },
      }),
    ]);

    return [tenManRaids, twentyManRaids, fortyManRaids];
  }),

  getById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.raid.findUnique({
      where: { id: input },
      select: {
        id: true,
        name: true,
        type: true,
        bosses: {
          select: {
            id: true,
            name: true,
          },
          orderBy: {
            createdAt: "asc",
          },
        },
      },
    });
  }),

  createTrash: adminProcedure
    .input(
      z.object({
        raidId: z.string(),
        title: z.string(),
        imageURL: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.trash.create({
        data: {
          raidId: input.raidId,
          title: input.title,
          imageURL: input.imageURL || "https://via.placeholder.com/300",
          description: input.description,
        },
      });
    }),

  getTrash: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    return ctx.db.trash.findMany({
      where: { raidId: input },
      orderBy: { createdAt: "asc" },
    });
  }),

  getTrashById: adminProcedure
    .input(z.object({ id: z.string() }))
    .query(async ({ ctx, input }) => {
      return ctx.db.trash.findUnique({
        where: { id: input.id },
        include: {
          raid: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      });
    }),

  editTrash: adminProcedure
    .input(
      z.object({
        id: z.string(),
        raidId: z.string(),
        title: z.string(),
        imageURL: z.string(),
        description: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return ctx.db.trash.update({
        where: {
          id: input.id,
          raidId: input.raidId,
        },
        data: {
          title: input.title,
          imageURL: input.imageURL,
          description: input.description,
        },
      });
    }),

  deleteTrash: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      return ctx.db.trash.delete({
        where: { id: input },
      });
    }),
});
