import { ApiProperty } from '@nestjs/swagger';

export class CredentialsPayload {
  @ApiProperty()
  email: string;
  @ApiProperty()
  password: string;
}
