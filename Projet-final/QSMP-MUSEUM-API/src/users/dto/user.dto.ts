import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { User } from '../entities/user.entity';

export class CreateUserDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsOptional() // Mis à jour pour être facultatif
  twitchUsername?: string;

  @IsOptional() // Mis à jour pour être facultatif
  role?: string;
}

export class UserDto {
  id: number;
  username: string;
  email: string;
  twitchUsername?: string;
  role?: string;

  static fromEntity(user: User): UserDto {
    const { id, username, email, twitchUsername, role } = user;
    const userDto = new UserDto();
    userDto.id = id;
    userDto.username = username;
    userDto.email = email;
    userDto.twitchUsername = twitchUsername;
    userDto.role = role;
    return userDto;
  }
}

export class UpdateUserDto {
  @IsOptional()
  username?: string;

  @IsOptional()
  email?: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  twitchUsername?: string;

  @IsOptional()
  role?: string;
}
