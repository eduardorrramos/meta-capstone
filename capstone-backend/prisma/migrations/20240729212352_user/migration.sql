/*
  Warnings:

  - The primary key for the `Bookmarks` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `border` on the `Bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `borderRegion` on the `Bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `crossingName` on the `Bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `hours` on the `Bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `passengerVehicleWait` on the `Bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `pedestrianLaneWait` on the `Bookmarks` table. All the data in the column will be lost.
  - You are about to drop the column `portStatus` on the `Bookmarks` table. All the data in the column will be lost.
  - Added the required column `borderIndex` to the `Bookmarks` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmarks" DROP CONSTRAINT "Bookmarks_pkey",
DROP COLUMN "border",
DROP COLUMN "borderRegion",
DROP COLUMN "crossingName",
DROP COLUMN "hours",
DROP COLUMN "passengerVehicleWait",
DROP COLUMN "pedestrianLaneWait",
DROP COLUMN "portStatus",
ADD COLUMN     "borderIndex" TEXT NOT NULL,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Bookmarks_pkey" PRIMARY KEY ("id");
