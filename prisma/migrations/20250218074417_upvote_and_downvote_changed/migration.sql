/*
  Warnings:

  - You are about to drop the column `downVote` on the `secret` table. All the data in the column will be lost.
  - You are about to drop the column `upVote` on the `secret` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "secret" DROP COLUMN "downVote",
DROP COLUMN "upVote",
ADD COLUMN     "downvote" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvote" INTEGER NOT NULL DEFAULT 0;
