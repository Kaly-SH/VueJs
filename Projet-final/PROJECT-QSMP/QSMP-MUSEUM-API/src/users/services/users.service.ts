import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async findAll(): Promise<UserDto[]> {
    const users = await this.usersRepository.find();
    return users.map((user) => UserDto.fromEntity(user));
  }

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { username, email, password, twitchUsername, role } = createUserDto;
    const newUser = this.usersRepository.create({
      username,
      email,
      password,
      twitchUsername,
      role,
    });
    await this.usersRepository.save(newUser);
    return UserDto.fromEntity(newUser);
  }

  async findOneById(id: number): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    return UserDto.fromEntity(user);
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);
    return UserDto.fromEntity(user);
  }

  async removeUser(id: number): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID "${id}" not found`);
    }
    await this.usersRepository.remove(user);
  }
}
