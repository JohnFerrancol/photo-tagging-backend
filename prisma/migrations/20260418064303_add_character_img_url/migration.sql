/*
  Warnings:

  - You are about to drop the column `name` on the `Leaderboard` table. All the data in the column will be lost.
  - Added the required column `imageUrl` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `playerName` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Character" ADD COLUMN     "imageUrl" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Leaderboard" DROP COLUMN "name",
ADD COLUMN     "playerName" TEXT NOT NULL;
