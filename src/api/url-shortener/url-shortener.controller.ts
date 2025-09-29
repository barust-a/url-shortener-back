import { Controller, Post, Get, Param, Body, Res } from "@nestjs/common"
import { UrlShortenerService } from "./url-shortener.service"
import type { Response } from "express"

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlService: UrlShortenerService) {}

  @Post()
  async createShortUrl(@Body("url") url: string): Promise<string> {
    const existingUrl = await this.urlService.getShortUrlFromLongUrl(url)
    const shortUrl = existingUrl || (await this.urlService.createShortUrl(url))
    return shortUrl
  }

  @Get(":id")
  async getLongUrlFromId(
    @Param("id") id: string,
    @Res() res: Response,
  ): Promise<void> {
    const url = await this.urlService.getLongUrlFromId(id)

    await this.urlService.incrementClicks(id)
    return res.redirect(url)
  }
}
