/*
  Warnings:

  - Changed the type of `club` on the `reservation` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Club" AS ENUM ('skkuding', 'skkud');

-- AlterTable
ALTER TABLE "reservation" DROP COLUMN "club",
ADD COLUMN     "club" "Club" NOT NULL;
