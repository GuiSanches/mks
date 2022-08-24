import { Injectable, NotFoundException } from '@nestjs/common';
import { AddMoviePayload } from './models/add-movie.payload';
import { MovieFilterPayload } from './models/movie-filter.payload';
import { Movie } from './movie.entity';
import { MovieRepository } from './movies.repository';

@Injectable()
export class MoviesService {
  constructor(private movieRepository: MovieRepository) {}

  async addMovie(addMoviePayload: AddMoviePayload): Promise<Movie> {
    return this.movieRepository.addMovie(addMoviePayload);
  }

  async findMovieByName(name: string): Promise<Movie> {
    const movie = await this.movieRepository.findMovieByName(name);

    if (movie) return movie;
    else throw new NotFoundException('Não foi encontrado o filme');
  }

  async findMovieByFilter(
    movieFilterPayload: MovieFilterPayload,
  ): Promise<Movie[]> {
    const movies = await this.movieRepository.findMovieByFilter(
      movieFilterPayload,
    );

    if (movies.length > 0) return movies;
    else throw new NotFoundException('Não foi encontrado o filme');
  }

  async updateMovieByName(
    name: string,
    movieFilterPayload: MovieFilterPayload,
  ): Promise<Movie> {
    const movie = await this.movieRepository.updateMovieByName(
      name,
      movieFilterPayload,
    );

    return movie;
  }

  async deleteMovie(name: string) {
    const result = await this.movieRepository.delete({
      name,
    });

    if (result.affected === 0)
      throw new NotFoundException('Não foi encontrado o filme');
  }
}
