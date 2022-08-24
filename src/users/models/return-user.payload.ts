import { User } from '../user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnUserPayload {
  @ApiProperty()
  user: User;
  @ApiProperty()
  message: string;
}
