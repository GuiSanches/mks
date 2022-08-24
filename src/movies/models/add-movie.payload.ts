import { IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class AddMoviePayload {
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe um nome de filme',
  })
  name: string;
  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o ano de lançamento',
  })
  @ApiProperty()
  @IsNumber(undefined, { message: 'O ano deve ser numérico' })
  year: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe a avaliação do filme',
  })
  @ApiProperty()
  @IsNumber(undefined, { message: 'A avaliação deve ser numérica' })
  stars: number;

  @ApiProperty()
  @IsNotEmpty({
    message: 'Informe o link para o filme',
  })
  videoURL: string;
}
