import { Module } from "@nestjs/common"
import { ScheduleModule } from "@nestjs/schedule"
import { PrismaModule } from "./prisma/prisma.module"
import { UrlShortenerModule } from "./api/url-shortener/url-shortener.module"
import { CleanupModule } from "./cron/cleanup/cleanup.module"

@Module({
  imports: [
    ScheduleModule.forRoot(), // to make cron active
    PrismaModule,
    UrlShortenerModule,
    CleanupModule,
  ],
})
export class AppModule {}
