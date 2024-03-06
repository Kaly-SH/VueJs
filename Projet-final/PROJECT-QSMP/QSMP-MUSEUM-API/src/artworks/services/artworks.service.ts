import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Artwork } from '../entities/artwork.entity';
import { CreateArtworkDto, ArtworkDto } from '../dto/artwork.dto';

@Injectable()
export class ArtworksService {
  constructor(
    @InjectRepository(Artwork)
    private readonly artworkRepository: Repository<Artwork>,
  ) {}

  async createArtwork(createArtworkDto: CreateArtworkDto): Promise<ArtworkDto> {
    const artwork = this.artworkRepository.create(createArtworkDto);
    await this.artworkRepository.save(artwork);
    return ArtworkDto.fromEntity(artwork);
  }

  async findAllArtworks(): Promise<ArtworkDto[]> {
    const artworks = await this.artworkRepository.find();
    return artworks.map((artwork) => ArtworkDto.fromEntity(artwork));
  }

  async findArtworkById(id: number): Promise<ArtworkDto> {
    const artwork = await this.artworkRepository.findOne({ where: { id } });
    if (!artwork) {
      throw new NotFoundException(`Artwork with ID "${id}" not found`);
    }
    return ArtworkDto.fromEntity(artwork);
  }

  async updateArtwork(
    id: number,
    updateArtworkDto: Partial<CreateArtworkDto>,
  ): Promise<ArtworkDto> {
    const artwork = await this.artworkRepository.findOne({ where: { id } });
    if (!artwork) {
      throw new NotFoundException(`Artwork with ID "${id}" not found`);
    }
    Object.assign(artwork, updateArtworkDto);
    await this.artworkRepository.save(artwork);
    return ArtworkDto.fromEntity(artwork);
  }

  async removeArtwork(id: number): Promise<void> {
    const artwork = await this.artworkRepository.findOne({ where: { id } });
    if (!artwork) {
      throw new NotFoundException(`Artwork with ID "${id}" not found`);
    }
    await this.artworkRepository.remove(artwork);
  }
}
