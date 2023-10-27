import { PrismaClient } from '@prisma/client';
import env_values from '@/config';

declare global {
    var prisma: PrismaClient | undefined;
}

const client = globalThis.prisma || new PrismaClient();

if (env_values.nextEnv !== 'production') globalThis.prisma = client;

export default client;