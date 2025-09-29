/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable } from "@nestjs/common"
import { nanoid } from "nanoid"
import { PrismaService } from "src/prisma/prisma.service"

@Injectable()
export class UrlShortenerService {
  constructor(private prisma: PrismaService) {}

  async createShortUrl(url: string): Promise<string> {
    const id = nanoid()
    const baseUrl = "localhost"

    await this.prisma.shortenedUrl.create({
      data: {
        id,
        url,
      },
    })

    return `${baseUrl}/${id}`
  }

  async getLongUrlFromId(id: string): Promise<string | null> {
    const exitingUrl = await this.prisma.shortenedUrl.findUnique({
      where: { id },
    })
    console.log("🚀 ~ UrlShortenerService ~ getShortUrl ~ url:", exitingUrl)
    return exitingUrl
  }

  // used to avoid short url duplication
  async getShortUrlFromLongUrl(url: string): Promise<string | null> {
    const exitingUrl = await this.prisma.shortenedUrl.findUnique({
      where: { url },
    })
    console.log("🚀 ~ UrlShortenerService ~ getShortUrl ~ url:", url)
    return exitingUrl
  }

  async incrementClicks(id: string): Promise<void> {
    await this.prisma.shortenedUrl.update({
      where: { id },
      data: { clickCounter: { increment: 1 } },
    })
  }
}
