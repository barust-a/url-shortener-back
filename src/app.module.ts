import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UrlShortenerModule } from './api/url-shortener/url-shortener.module';
import { CleanupModule } from './cron/cleanup/cleanup.module';

@Module({
  imports: [PrismaModule, UrlShortenerModule, CleanupModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
