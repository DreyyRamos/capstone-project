/*
  Warnings:

  - You are about to drop the `Test` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'MODERATOR', 'EDITOR', 'STUDENT');

-- CreateEnum
CREATE TYPE "PublicationStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED', 'PENDING_REVIEW');

-- DropTable
DROP TABLE "Test";

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "password" TEXT NOT NULL,
    "profileImage" TEXT,
    "roles" "Role"[],

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Publication" (
    "pubId" TEXT NOT NULL,
    "title" VARCHAR(255),
    "excerpt" VARCHAR(255),
    "content" VARCHAR(65535),
    "authorId" TEXT,
    "imageUrl" TEXT,
    "tags" TEXT,
    "category" TEXT,
    "status" "PublicationStatus" NOT NULL DEFAULT 'DRAFT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Publication_pkey" PRIMARY KEY ("pubId")
);

-- CreateTable
CREATE TABLE "Forum" (
    "forumId" TEXT NOT NULL,
    "topicTitle" VARCHAR(255),
    "description" VARCHAR(65535),
    "authorId" TEXT,
    "imageUrl" TEXT,
    "tags" TEXT,
    "category" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Forum_pkey" PRIMARY KEY ("forumId")
);

-- CreateTable
CREATE TABLE "ForumReplies" (
    "commentId" TEXT NOT NULL,
    "comment_content" TEXT,
    "forumId" TEXT,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ForumReplies_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "ForumLikes" (
    "likeId" TEXT NOT NULL,
    "forumId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "ForumLikes_pkey" PRIMARY KEY ("likeId")
);

-- CreateTable
CREATE TABLE "PublicationComments" (
    "commentId" TEXT NOT NULL,
    "comment_content" TEXT,
    "pubId" TEXT,
    "authorId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PublicationComments_pkey" PRIMARY KEY ("commentId")
);

-- CreateTable
CREATE TABLE "PublicationLikes" (
    "likeId" TEXT NOT NULL,
    "pubId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "isLiked" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "PublicationLikes_pkey" PRIMARY KEY ("likeId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_id_key" ON "User"("id");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "ForumLikes_forumId_userId_key" ON "ForumLikes"("forumId", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "PublicationLikes_pubId_userId_key" ON "PublicationLikes"("pubId", "userId");

-- AddForeignKey
ALTER TABLE "Publication" ADD CONSTRAINT "Publication_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Forum" ADD CONSTRAINT "Forum_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumReplies" ADD CONSTRAINT "ForumReplies_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumReplies" ADD CONSTRAINT "ForumReplies_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumLikes" ADD CONSTRAINT "ForumLikes_forumId_fkey" FOREIGN KEY ("forumId") REFERENCES "Forum"("forumId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ForumLikes" ADD CONSTRAINT "ForumLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationComments" ADD CONSTRAINT "PublicationComments_pubId_fkey" FOREIGN KEY ("pubId") REFERENCES "Publication"("pubId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationComments" ADD CONSTRAINT "PublicationComments_authorId_fkey" FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationLikes" ADD CONSTRAINT "PublicationLikes_pubId_fkey" FOREIGN KEY ("pubId") REFERENCES "Publication"("pubId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "PublicationLikes" ADD CONSTRAINT "PublicationLikes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
