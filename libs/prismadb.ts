import { PrismaClient } from "@prisma/client"

declare global {
  var prisma: PrismaClient | undefined
}

// globalThis variable is akin to the global object, which is not affected by hot reload
// need to save into the gloablThis object because next.js hot reload can create many instances of prisma
// which will break the function
const client = globalThis.prisma || new PrismaClient()
if (process.env.NODE_ENV !== 'production') globalThis.prisma=client;

export default client;