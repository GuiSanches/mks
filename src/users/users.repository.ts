import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { CreateUserPayload } from './models/create-user.payload';
import { UserRole } from './models/users-roles.enum';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CredentialsPayload } from 'src/auth/models/credentials.payload';

const UNIQUE_VIOLATION_CODE = '23505';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(private dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(
    createUserPayload: CreateUserPayload,
    role: UserRole,
  ): Promise<User> {
    const { email, name, password } = createUserPayload;
    const user = this.create();
    user.email = email;
    user.name = name;
    user.role = role;
    user.status = true;
    user.confirmationToken = crypto.randomBytes(32).toString('hex');
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
      delete user.password;
      delete user.salt;
      return user;
    } catch (error) {
      if (error.code.toString() === UNIQUE_VIOLATION_CODE)
        throw new ConflictException('Endereço de email já está em uso');
      else
        throw new InternalServerErrorException(
          'Erro ao salvar o usuário no banco de dados',
        );
    }
  }

  async checkCredentials(
    credentialsPayload: CredentialsPayload,
  ): Promise<User> {
    const { email, password } = credentialsPayload;

    const user = await this.findOne({
      where: {
        email,
        status: true,
      },
    });

    if (user && (await user.checkPassword(password))) return user;
    else return null;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
