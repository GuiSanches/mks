import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserPayload } from 'src/users/models/create-user.payload';
import { UserRole } from 'src/users/models/users-roles.enum';
import { User } from 'src/users/user.entity';
import { UserRepository } from 'src/users/users.repository';
import { CredentialsPayload } from './models/credentials.payload';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(createUserPayload: CreateUserPayload): Promise<User> {
    return await this.userRepository.createUser(
      createUserPayload,
      UserRole.USER,
    );
  }

  async signIn(credentialsPayload: CredentialsPayload) {
    const user = await this.userRepository.checkCredentials(credentialsPayload);

    if (!user) throw new UnauthorizedException('Credenciais inválidas');

    const jwtPayload = {
      id: user.id,
    };

    const token = await this.jwtService.sign(jwtPayload);

    return { token };
  }
}
