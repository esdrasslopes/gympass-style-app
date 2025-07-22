import fastify from "fastify";

import { PrismaClient } from "generated/prisma/client";

const prisma = new PrismaClient();

prisma.user.create({
  data: {
    name: "Esdras Lopes",
    email: "esdras@gmail.com",
  },
});

export const app = fastify();
