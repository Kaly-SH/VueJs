import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UpdateUserDto, UserDto } from '../dto/user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<UserDto> {
    return this.usersService.createUser(createUserDto);
  }

  @Get(':uuid')
  async findOne(@Param('uuid') uuid: string): Promise<UserDto> {
    return this.usersService.findOneByUuid(uuid);
  }

  @Put(':uuid')
  async update(
    @Param('uuid') uuid: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.usersService.updateUser(uuid, updateUserDto);
  }

  @Delete(':uuid')
  async remove(@Param('uuid') uuid: string): Promise<void> {
    return this.usersService.removeUser(uuid);
  }
}
