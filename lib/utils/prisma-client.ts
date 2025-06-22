import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => new PrismaClient();

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

export const prismaClient = globalThis.prismaGlobal || prismaClientSingleton();

export default prismaClient;

if (process.env.NODE_ENV !== "production") {
  globalThis.prismaGlobal = prismaClient;
}
