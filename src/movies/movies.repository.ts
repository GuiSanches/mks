import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { AddMoviePayload } from './models/add-movie.payload';
import { MovieFilterPayload } from './models/movie-filter.payload';
import { Movie } from './movie.entity';

const UNIQUE_VIOLATION_CODE = '23505';

@Injectable()
export class MovieRepository extends Repository<Movie> {
  constructor(private dataSource: DataSource) {
    super(Movie, dataSource.createEntityManager());
  }

  async addMovie(addMoviePayload: AddMoviePayload): Promise<Movie> {
    const { name, stars, videoURL, year } = addMoviePayload;
    const movie = this.create();

    movie.name = name;
    movie.stars = stars;
    movie.videoURL = videoURL;
    movie.year = year;

    try {
      await movie.save();
      return movie;
    } catch (error) {
      if (error.code.toString() === UNIQUE_VIOLATION_CODE)
        throw new ConflictException('Filme já cadastrado');
      else
        throw new InternalServerErrorException(
          'Erro ao salvar o filme no banco de dados',
        );
    }
  }

  async findMovieByName(name: string): Promise<Movie | null> {
    const movie = await this.findOne({
      where: {
        name,
      },
    });

    if (!movie) throw new NotFoundException('Não foi encontrado o filme');
    return movie;
  }

  async findMovieByFilter(
    movieFilterPayload: MovieFilterPayload,
  ): Promise<Movie[]> {
    const { name, stars, year } = movieFilterPayload;

    const query = this.createQueryBuilder('movie');
    if (name) query.andWhere('movie.name ILIKE :name', { name: `%${name}%` });

    if (stars) query.andWhere('movie.stars = :stars', { stars });

    if (year) query.andWhere('movie.year = :year', { year });

    query.select(['movie.name', 'movie.stars', 'movie.year']);

    const movies = await query.getMany();

    return movies;
  }

  async updateMovieByName(
    name: string,
    movieFilterPayload: MovieFilterPayload,
  ) {
    const updatedMovie = await this.findMovieByName(name);
    const { name: movie, stars, year } = movieFilterPayload;

    updatedMovie.name = movie ? movie : updatedMovie.name;
    updatedMovie.stars = stars ? stars : updatedMovie.stars;
    updatedMovie.year = year ? year : updatedMovie.year;

    try {
      await updatedMovie.save();
      return updatedMovie;
    } catch (error) {
      throw new InternalServerErrorException(
        'Erro ao salvar os dados no banco de dados',
      );
    }
  }
}
