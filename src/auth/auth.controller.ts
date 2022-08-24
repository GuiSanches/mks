import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserPayload } from 'src/users/models/create-user.payload';
import { User } from 'src/users/user.entity';
import { AuthService } from './auth.service';
import { GetUser } from './get-user.decorator';
import { CredentialsPayload } from './models/credentials.payload';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  @ApiOkResponse({
    description: 'Cadastro com sucesso',
    content: {
      'application/json': {
        example: 'Cadastro realizado com sucesso',
      },
    },
  })
  async signUp(
    @Body(ValidationPipe) createUserPayload: CreateUserPayload,
  ): Promise<{ message: string }> {
    await this.authService.signUp(createUserPayload);
    return {
      message: 'Cadastro realizado com sucesso',
    };
  }

  @Post('signin')
  async signIn(
    @Body(ValidationPipe) credentialsPayload: CredentialsPayload,
  ): Promise<{ token: string }> {
    return await this.authService.signIn(credentialsPayload);
  }

  @Get('/me')
  @ApiOkResponse({ type: User })
  @UseGuards(AuthGuard())
  getMe(@GetUser() user: User): User {
    return user;
  }
}
