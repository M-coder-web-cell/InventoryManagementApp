-- CreateEnum
CREATE TYPE "Tier" AS ENUM ('FREE', 'PRO', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "tier" "Tier" NOT NULL DEFAULT 'FREE';
