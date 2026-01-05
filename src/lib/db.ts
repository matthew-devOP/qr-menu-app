import { PrismaClient } from '@prisma/client'

/**
 * Global Prisma Client instance
 * Using global to prevent multiple instances in development (hot reload)
 */
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  })

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma
}

/**
 * Helper function to disconnect Prisma (useful for cleanup in tests)
 */
export async function disconnectPrisma() {
  await prisma.$disconnect()
}
