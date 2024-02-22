import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ArtworksService } from '../services/artworks.service';
import { CreateArtworkDto, ArtworkDto } from '../dto/artwork.dto';

@Controller('artworks')
export class ArtworksController {
  constructor(private readonly artworksService: ArtworksService) {}

  @Post()
  async create(
    @Body() createArtworkDto: CreateArtworkDto,
  ): Promise<ArtworkDto> {
    return this.artworksService.createArtwork(createArtworkDto);
  }

  @Get()
  async findAll(): Promise<ArtworkDto[]> {
    return this.artworksService.findAllArtworks();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ArtworkDto> {
    return this.artworksService.findArtworkById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updateArtworkDto: Partial<CreateArtworkDto>,
  ): Promise<ArtworkDto> {
    return this.artworksService.updateArtwork(id, updateArtworkDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.artworksService.removeArtwork(id);
  }
}
