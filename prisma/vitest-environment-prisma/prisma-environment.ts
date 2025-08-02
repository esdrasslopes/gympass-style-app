import "dotenv/config";

import { randomUUID } from "node:crypto";

import type { Environment } from "vitest/environments";

import { execSync } from "node:child_process";

import { PrismaClient } from "@prisma/client";

function genereateDatabaseURL(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error("Please provide a DATABASE_URL environment variable.");
  }

  const url = new URL(process.env.DATABASE_URL);

  url.searchParams.set("schema", schema);

  return url.toString();
}

export default <Environment>{
  name: "prisma",
  transformMode: "ssr",
  async setup() {
    const schema = randomUUID();

    const databaseURL = genereateDatabaseURL(schema);

    process.env.DATABASE_URL = databaseURL;

    execSync("npx prisma db push");

    return {
      async teardown() {
        const prisma = new PrismaClient({
          datasources: {
            db: {
              url: databaseURL,
            },
          },
        });

        await prisma.$executeRawUnsafe(
          `DROP SCHEMA IF EXISTS "${schema}" CASCADE`
        );

        await prisma.$disconnect();
      },
    };
  },
};
