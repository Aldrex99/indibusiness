/**
 * /utils/prisma.utils.ts - Prisma Client Creation
 */

import {PrismaClient} from "@prisma/client";

export default function prismaCreation() {
  return new PrismaClient({
    errorFormat: "pretty",
    log: [
      {
        emit: "event",
        level: "query",
      },
      {
        emit: "event",
        level: "info",
      },
      {
        emit: "event",
        level: "warn",
      },
    ],
  });
}