/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `ShortenedUrl` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."ShortenedUrl" ALTER COLUMN "expireAt" SET DEFAULT (NOW() + interval '14 days');

-- CreateIndex
CREATE UNIQUE INDEX "ShortenedUrl_url_key" ON "public"."ShortenedUrl"("url");
