import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { CharactersService } from '../services/characters.service';
import { CharacterDto } from '../dto/character.dto';
import { Character } from '../entities/character.entity';

@Controller('characters')
export class CharactersController {
  constructor(private readonly charactersService: CharactersService) {}

  @Post()
  async create(@Body() characterDto: CharacterDto): Promise<Character> {
    return this.charactersService.createCharacter(characterDto);
  }

  @Get()
  async findAll(): Promise<Character[]> {
    return this.charactersService.findAllCharacters();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Character> {
    return this.charactersService.findCharacterById(Number(id));
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() characterDto: CharacterDto,
  ): Promise<Character> {
    return this.charactersService.updateCharacter(Number(id), characterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.charactersService.deleteCharacter(Number(id));
  }
}
