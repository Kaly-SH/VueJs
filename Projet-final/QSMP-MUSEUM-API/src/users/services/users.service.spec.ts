import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from '../entities/user.entity';

describe('UsersService', () => {
  let service: UsersService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const newUserDto = {
        pseudo: 'test',
        email: 'test@example.com',
        password: 'password',
      };
      const expectedUser = new User();
      expectedUser.id = 1;
      expectedUser.pseudo = 'test';
      expectedUser.email = 'test@example.com';

      jest.spyOn(repository, 'create').mockReturnValue(expectedUser);
      jest.spyOn(repository, 'save').mockResolvedValueOnce(expectedUser);

      const result = await service.createUser(newUserDto);
      expect(result).toEqual({
        id: 1,
        pseudo: 'test',
        email: 'test@example.com',
        twitchPseudo: undefined,
        role: undefined,
      });
    });
  });

  // Ajoutez des tests similaires pour les autres méthodes du service
});
