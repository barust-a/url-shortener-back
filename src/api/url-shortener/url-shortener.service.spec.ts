import { Test, TestingModule } from "@nestjs/testing"
import { UrlShortenerService } from "./url-shortener.service"
import { PrismaService } from "src/prisma/prisma.service"

describe("UrlShortenerService", () => {
  let service: UrlShortenerService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UrlShortenerService, PrismaService],
    }).compile()

    service = module.get<UrlShortenerService>(UrlShortenerService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
