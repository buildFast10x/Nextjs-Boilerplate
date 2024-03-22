import { PrismaClient } from '@prisma/client';
import configEnv from "@/config"

declare global {
    var prisma: PrismaClient | undefined;
}

const prisma = globalThis.prisma || new PrismaClient();

if (configEnv.env !== 'production') globalThis.prisma = prisma;

export default prisma;


// import { PrismaClient } from "@prisma/client"

// const globalForPrisma = global as unknown as { prisma: PrismaClient }

// export const prisma =
//     globalForPrisma.prisma ||
//     new PrismaClient({
//         log: ['query']
//     })


// if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma