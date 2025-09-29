import { Controller, Post, Get, Param, Body } from "@nestjs/common"
import { UrlShortenerService } from "./url-shortener.service"

@Controller()
export class UrlShortenerController {
  constructor(private readonly urlService: UrlShortenerService) {}

  @Post()
  async createShortUrl(@Body("url") url: string) {
    const existingUrl = await this.urlService.getShortUrlFromLongUrl(url)
    return existingUrl || (await this.urlService.createShortUrl(url))
  }

  @Get(":id")
  async getLongUrlFromId(@Param("id") id: string) {
    const url = await this.urlService.getLongUrlFromId(id)

    await this.urlService.incrementClicks(id)
    return url
  }
}
