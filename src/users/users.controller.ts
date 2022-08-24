import {
  Body,
  Controller,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Role } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { CreateUserPayload } from './models/create-user.payload';
import { ReturnUserPayload } from './models/return-user.payload';
import { UserRole } from './models/users-roles.enum';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Post()
  @Role(UserRole.ADMIN)
  @UseGuards(AuthGuard(), RolesGuard)
  @ApiOkResponse({ type: ReturnUserPayload })
  async createAdminUser(
    @Body(ValidationPipe)
    createUserPayload: CreateUserPayload,
  ): Promise<ReturnUserPayload> {
    const user = await this.usersService.createAdminUser(createUserPayload);

    return {
      user,
      message: 'Administrador cadastrado com sucesso',
    };
  }
}
