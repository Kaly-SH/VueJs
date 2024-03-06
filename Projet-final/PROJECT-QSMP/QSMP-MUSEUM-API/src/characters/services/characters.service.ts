import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Character } from '../entities/character.entity';
import { CharacterDto } from '../dto/character.dto';

@Injectable()
export class CharactersService {
  constructor(
    @InjectRepository(Character)
    private readonly characterRepository: Repository<Character>,
  ) {}

  async createCharacter(characterDto: CharacterDto): Promise<Character> {
    const { name, streamerName, type } = characterDto;
    const character = this.characterRepository.create({
      name,
      streamerName,
      type,
    });
    return this.characterRepository.save(character);
  }

  async findAllCharacters(): Promise<Character[]> {
    return this.characterRepository.find();
  }

  async findCharacterById(id: number): Promise<Character> {
    const character = await this.characterRepository.findOne({ where: { id } });
    if (!character) {
      throw new NotFoundException(`Character with ID "${id}" not found`);
    }
    return character;
  }

  async updateCharacter(
    id: number,
    characterDto: CharacterDto,
  ): Promise<Character> {
    const { name, streamerName, type } = characterDto;
    const character = await this.findCharacterById(id);
    character.name = name;
    character.streamerName = streamerName;
    character.type = type;
    return this.characterRepository.save(character);
  }

  async deleteCharacter(id: number): Promise<void> {
    const character = await this.findCharacterById(id);
    await this.characterRepository.remove(character);
  }
}
