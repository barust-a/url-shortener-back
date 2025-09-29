-- CreateTable
CREATE TABLE "public"."ShortenedUrl" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireAt" TIMESTAMP(3) NOT NULL DEFAULT (NOW() + interval '14 days'),
    "clicks" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "ShortenedUrl_pkey" PRIMARY KEY ("id")
);
