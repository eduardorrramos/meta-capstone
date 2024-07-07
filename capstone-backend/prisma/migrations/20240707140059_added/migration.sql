-- CreateTable
CREATE TABLE "Comment" (
    "userId" TEXT NOT NULL,
    "borderNum" INTEGER NOT NULL,
    "userInput" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("userId")
);

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("email") ON DELETE RESTRICT ON UPDATE CASCADE;
