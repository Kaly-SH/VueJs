import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../services/users.service';
import { CreateUserDto, UserDto } from '../dto/user.dto';

describe('UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useClass: jest.fn(() => ({
            createUser: jest.fn(),
            findOneByUuid: jest.fn(),
            updateUser: jest.fn(),
            removeUser: jest.fn(),
          })),
        },
      ],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const createUserDto: CreateUserDto = {
        pseudo: 'test',
        email: 'test@example.com',
        password: 'password',
      };
      const expectedUserDto: UserDto = {
        id: 1,
        uuid: 'some-uuid', // Ajoutez un UUID factice pour le test
        pseudo: 'test',
        email: 'test@example.com',
      };

      jest.spyOn(service, 'createUser').mockResolvedValueOnce(expectedUserDto);

      const result = await controller.create(createUserDto);
      expect(result).toEqual(expectedUserDto);
    });
  });

  // Ajoutez des tests similaires pour les autres méthodes du contrôleur
});
