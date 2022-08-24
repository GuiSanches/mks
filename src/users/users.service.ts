import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateUserPayload } from './models/create-user.payload';
import { UserRole } from './models/users-roles.enum';
import { User } from './user.entity';
import { UserRepository } from './users.repository';

@Injectable()
export class UsersService {
  constructor(private userRepository: UserRepository) {}

  async createAdminUser(createUserPayload: CreateUserPayload): Promise<User> {
    return this.userRepository.createUser(createUserPayload, UserRole.ADMIN);
  }
}
