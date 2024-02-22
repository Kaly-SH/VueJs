import { IsNotEmpty, IsUrl, IsBoolean, IsNumber } from 'class-validator';
import { Artwork } from '../entities/artwork.entity';

export class CreateArtworkDto {
  @IsNotEmpty()
  @IsUrl({}, { message: 'Invalid URL format' })
  artworkLink: string;

  @IsNotEmpty()
  artistName: string;

  @IsNotEmpty()
  description: string;

  @IsNumber()
  likeCount: number;

  @IsBoolean()
  displayedInMuseum: boolean;
}

export class ArtworkDto {
  id: number;
  artworkLink: string;
  characters: number[] | null; // Assuming character IDs, or null if not provided
  artistName: string;
  description: string;
  likeCount: number;
  displayedInMuseum: boolean;

  static fromEntity(artwork: Artwork): ArtworkDto {
    const {
      id,
      artworkLink,
      characters,
      artistName,
      description,
      likeCount,
      displayedInMuseum,
    } = artwork;
    const artworkDto = new ArtworkDto();
    artworkDto.id = id;
    artworkDto.artworkLink = artworkLink;
    artworkDto.characters = Array.isArray(characters)
      ? characters.map((character) => character.id)
      : null; // Check if characters is an array before mapping
    artworkDto.artistName = artistName;
    artworkDto.description = description;
    artworkDto.likeCount = likeCount;
    artworkDto.displayedInMuseum = displayedInMuseum;
    return artworkDto;
  }
}
