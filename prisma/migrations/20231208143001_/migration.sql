/*
  Warnings:

  - Added the required column `image` to the `categories` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "image" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "notifications" ALTER COLUMN "is_reads" DROP NOT NULL;
