-- CreateTable
CREATE TABLE "secretVote" (
    "id" SERIAL NOT NULL,
    "secretId" INTEGER NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "voteType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "secretVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "secretVote_secretId_ipAddress_key" ON "secretVote"("secretId", "ipAddress");

-- AddForeignKey
ALTER TABLE "secretVote" ADD CONSTRAINT "secretVote_secretId_fkey" FOREIGN KEY ("secretId") REFERENCES "secret"("id") ON DELETE CASCADE ON UPDATE CASCADE;
