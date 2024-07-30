/*
  Warnings:

  - The primary key for the `Bookmarks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `Bookmarks` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Bookmarks" DROP CONSTRAINT "Bookmarks_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "Bookmarks_pkey" PRIMARY KEY ("borderIndex");
