/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Injectable, NotFoundException } from "@nestjs/common"
import { nanoid } from "nanoid"
import { PrismaService } from "src/prisma/prisma.service"

const baseUrl = "http://localhost:3000"

@Injectable()
export class UrlShortenerService {
  constructor(private prisma: PrismaService) {}

  async createShortUrl(url: string): Promise<string> {
    const id = nanoid()

    await this.prisma.shortenedUrl.create({
      data: {
        id,
        url,
      },
    })

    return `${baseUrl}/${id}`
  }

  async getLongUrlFromId(id: string): Promise<string> {
    const exitingUrl = await this.prisma.shortenedUrl.findUnique({
      where: { id },
    })
    if (!exitingUrl?.url) {
      throw new NotFoundException(`id : ${id} do not exist `)
    }
    return exitingUrl.url
  }

  // used to avoid short url duplication
  async getShortUrlFromLongUrl(url: string): Promise<string | undefined> {
    const exitingUrl = await this.prisma.shortenedUrl.findUnique({
      where: { url },
    })

    console.log("🚀 ~ UrlShortenerService ~ getShortUrl ~ url:", url)
    const shortUrl = exitingUrl?.id ? `${baseUrl}/${exitingUrl?.id}` : undefined
    return shortUrl
  }

  async incrementClicks(id: string): Promise<void> {
    await this.prisma.shortenedUrl.update({
      where: { id },
      data: { clicks: { increment: 1 } },
    })
  }
}
