import "server-only";
import { PrismaClient } from "@prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const connectionString = process.env.DATABASE_URL || "file:./dev.db";

// In Prisma 7, the adapter expects a config object with a 'url' property.
// Passing the database instance directly can lead to 'undefined (reading replace)' errors.
const adapter = new PrismaBetterSqlite3({ 
  url: connectionString 
});

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter,
    log: ["query"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
