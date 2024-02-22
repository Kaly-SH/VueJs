import { IsNotEmpty } from 'class-validator';

export class CharacterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  streamerName: string;

  @IsNotEmpty()
  type: string;
}
