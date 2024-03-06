import { Module } from '@nestjs/common';
import { CharactersController } from './controllers/characters.controller';
import { CharactersService } from './services/characters.service';
import { Character } from './entities/character.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Character])],
  controllers: [CharactersController],
  providers: [CharactersService],
})
export class CharactersModule {}
