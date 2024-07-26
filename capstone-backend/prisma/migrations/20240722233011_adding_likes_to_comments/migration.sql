/*
  Warnings:

  - Added the required column `likes` to the `Comments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Comments" ADD COLUMN     "likes" INTEGER NOT NULL;
