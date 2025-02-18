/*
  Warnings:

  - You are about to drop the column `downvotes` on the `secret` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `secret` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "secret" DROP COLUMN "downvotes",
DROP COLUMN "upvotes",
ADD COLUMN     "downVote" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upVote" INTEGER NOT NULL DEFAULT 0;
