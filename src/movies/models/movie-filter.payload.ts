import { IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class MovieFilterPayload {
  @ApiProperty()
  @IsOptional()
  @IsString({
    message: 'Informe um nome de usuário válido',
  })
  name: string;
  @ApiProperty()
  @IsOptional()
  @IsNumber(undefined, { message: 'O ano deve ser numérico' })
  year: number;
  @ApiProperty()
  @IsOptional()
  @IsNumber(undefined, { message: 'A avaliação deve ser numérica' })
  stars: number;
}
