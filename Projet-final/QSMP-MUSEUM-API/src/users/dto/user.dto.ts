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

  @IsOptional() // Mis à jour pour être facultatif
  twitchPseudo?: string;

  @IsOptional() // Mis à jour pour être facultatif
  role?: string;
}

export class UserDto {
  id: number;
  pseudo: string;
  email: string;
  twitchPseudo?: string;
  role?: string;

  static fromEntity(user: User): UserDto {
    const { id, pseudo, email, twitchPseudo, role } = user;
    const userDto = new UserDto();
    userDto.id = id;
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
