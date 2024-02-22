import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto/user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<UserDto> {
    const { pseudo, email, password, twitchPseudo, role } = createUserDto;
    const uuid = uuidv4(); // Génère un UUID unique
    const newUser = this.usersRepository.create({
      uuid,
      pseudo,
      email,
      password,
      twitchPseudo,
      role,
    });
    await this.usersRepository.save(newUser);
    return UserDto.fromEntity(newUser);
  }

  async findOneByUuid(uuid: string): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException(`User with UUID "${uuid}" not found`);
    }
    return UserDto.fromEntity(user);
  }

  async updateUser(
    uuid: string,
    updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    const user = await this.usersRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException(`User with UUID "${uuid}" not found`);
    }
    Object.assign(user, updateUserDto);
    await this.usersRepository.save(user);
    return UserDto.fromEntity(user);
  }

  async removeUser(uuid: string): Promise<void> {
    const user = await this.usersRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException(`User with UUID "${uuid}" not found`);
    }
    await this.usersRepository.remove(user);
  }
}
