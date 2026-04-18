/*
  Warnings:

  - You are about to drop the column `imageId` on the `Character` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `GameSession` table. All the data in the column will be lost.
  - You are about to drop the column `imageId` on the `Leaderboard` table. All the data in the column will be lost.
  - You are about to drop the `Image` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `gameId` to the `Character` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `GameSession` table without a default value. This is not possible if the table is not empty.
  - Added the required column `gameId` to the `Leaderboard` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Character" DROP CONSTRAINT "Character_imageId_fkey";

-- DropForeignKey
ALTER TABLE "GameSession" DROP CONSTRAINT "GameSession_imageId_fkey";

-- DropForeignKey
ALTER TABLE "Leaderboard" DROP CONSTRAINT "Leaderboard_imageId_fkey";

-- AlterTable
ALTER TABLE "Character" DROP COLUMN "imageId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "GameSession" DROP COLUMN "imageId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Leaderboard" DROP COLUMN "imageId",
ADD COLUMN     "gameId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Image";

-- CreateTable
CREATE TABLE "Game" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Character" ADD CONSTRAINT "Character_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Leaderboard" ADD CONSTRAINT "Leaderboard_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GameSession" ADD CONSTRAINT "GameSession_gameId_fkey" FOREIGN KEY ("gameId") REFERENCES "Game"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
