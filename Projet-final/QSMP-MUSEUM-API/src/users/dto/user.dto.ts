import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  pseudo: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  twitchPseudo?: string;

  role?: string;
}

export class UserDto {
  id: number;
  uuid: string; // Ajout de UUID
  pseudo: string;
  email: string;
  twitchPseudo?: string;
  role?: string;

  static fromEntity(user: User): UserDto {
    const { id, uuid, pseudo, email, twitchPseudo, role } = user;
    const userDto = new UserDto();
    userDto.id = id;
    userDto.uuid = uuid; // Inclure UUID
    userDto.pseudo = pseudo;
    userDto.email = email;
    userDto.twitchPseudo = twitchPseudo;
    userDto.role = role;
    return userDto;
  }
}

export class UpdateUserDto {
  @IsOptional()
  pseudo?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  twitchPseudo?: string;

  @IsOptional()
  role?: string;
}
