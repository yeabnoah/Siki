-- CreateTable
CREATE TABLE "secret" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "secretContent" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "secret_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "comment" (
    "id" SERIAL NOT NULL,
    "commentContent" TEXT NOT NULL,
    "secretId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "comment_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "comment" ADD CONSTRAINT "comment_secretId_fkey" FOREIGN KEY ("secretId") REFERENCES "secret"("id") ON DELETE CASCADE ON UPDATE CASCADE;
