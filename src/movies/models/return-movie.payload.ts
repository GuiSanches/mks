import { Movie } from '../movie.entity';
import { ApiProperty } from '@nestjs/swagger';

export class ReturnMoviePayload {
  @ApiProperty()
  movie: Movie;
  @ApiProperty()
  message: string;
}
