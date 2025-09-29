/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from "@nestjs/common"
import { Cron } from "@nestjs/schedule"
import { PrismaService } from "../../prisma/prisma.service"

@Injectable()
export class CleanupService {
  constructor(private prisma: PrismaService) {}

  @Cron("0 0 * * *") // every day at 0:00
  async deleteOldShortenedLinks() {
    const result = await this.prisma.shortenedUrl.deleteMany({
      where: { expireAt: { lt: new Date() } },
    })
    console.log(`🧹 Cleanup: ${result.count} expired links deleted.`)
  }
}
