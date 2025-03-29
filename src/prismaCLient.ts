import { PrismaClient } from '@prisma/client';

// Membuat instance Prisma Client
const prisma = new PrismaClient();

// Mengekspor instance Prisma Client untuk digunakan di file lain
export default prisma;
