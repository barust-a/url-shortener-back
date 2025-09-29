import { Test, TestingModule } from "@nestjs/testing"
import { CleanupService } from "./cleanup.service"
import { PrismaService } from "../../prisma/prisma.service"

describe("CleanupService", () => {
  let service: CleanupService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CleanupService, PrismaService],
    }).compile()

    service = module.get<CleanupService>(CleanupService)
  })

  it("should be defined", () => {
    expect(service).toBeDefined()
  })
})
