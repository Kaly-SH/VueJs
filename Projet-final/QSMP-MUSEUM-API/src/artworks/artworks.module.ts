import { Module } from '@nestjs/common';
import { ArtworksController } from './controllers/artworks.controller';
import { ArtworksService } from './services/artworks.service';
import { Artwork } from './entities/artwork.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Character } from '../characters/entities/character.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Artwork, Character])],
  controllers: [ArtworksController],
  providers: [ArtworksService],
})
export class ArtworksModule {}
