import { Module } from '@nestjs/common';
import { ArtworksController } from './controllers/artworks.controller';
import { ArtworksService } from './services/artworks.service';

@Module({
  controllers: [ArtworksController],
  providers: [ArtworksService],
})
export class ArtworksModule {}
