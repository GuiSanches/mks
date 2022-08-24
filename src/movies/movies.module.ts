import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { Movie } from './movie.entity';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieRepository } from './movies.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([Movie]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  providers: [MoviesService, MovieRepository],
  controllers: [MoviesController],
})
export class MoviesModule {}
