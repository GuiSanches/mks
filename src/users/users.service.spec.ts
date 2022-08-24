import { Test, TestingModule } from '@nestjs/testing';
import { UserRepository } from './../users/users.repository';
import { UsersService } from './users.service';
import { UserRole } from './models/users-roles.enum';
import { CreateUserPayload } from './models/create-user.payload';

const mockUserRepository = () => ({
  createUser: jest.fn(),
});

describe('UsersService', () => {
  let userRepository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: UserRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    userRepository = await module.get<UserRepository>(UserRepository);
    service = await module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('createUser', () => {
    let mockCreateUserDto: CreateUserPayload;

    beforeEach(() => {
      mockCreateUserDto = {
        email: 'mock@email.com',
        name: 'Mock User',
        password: 'mockPassword',
      };
    });

    it('should create an user if passwords match', async () => {
      userRepository.createUser.mockResolvedValue('mockUser');
      const result = await service.createAdminUser(mockCreateUserDto);

      expect(userRepository.createUser).toHaveBeenCalledWith(
        mockCreateUserDto,
        UserRole.ADMIN,
      );
      expect(result).toEqual('mockUser');
    });
  });
});
