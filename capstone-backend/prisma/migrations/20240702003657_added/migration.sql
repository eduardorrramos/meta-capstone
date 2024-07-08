/*
  Warnings:

  - You are about to drop the column `googleToken` on the `User` table. All the data in the column will be lost.
  - Added the required column `googleId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `imgUrl` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "googleToken",
ADD COLUMN     "googleId" INTEGER NOT NULL,
ADD COLUMN     "imgUrl" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;
