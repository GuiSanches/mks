import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/auth/roles.guard';
import { AddMoviePayload } from './models/add-movie.payload';
import { MovieFilterPayload } from './models/movie-filter.payload';
import { ReturnMoviePayload } from './models/return-movie.payload';
import { MoviesService } from './movies.service';

@Controller('movies')
@UseGuards(AuthGuard(), RolesGuard)
export class MoviesController {
  constructor(private moviesService: MoviesService) {}
  @Post()
  @ApiOkResponse({ type: ReturnMoviePayload })
  async addMovie(
    @Body(ValidationPipe)
    addMoviePayload: AddMoviePayload,
  ): Promise<ReturnMoviePayload> {
    const movie = await this.moviesService.addMovie(addMoviePayload);

    return {
      movie,
      message: 'Filme adicionado com sucesso!',
    };
  }

  @Get(':name')
  @ApiOkResponse({ type: ReturnMoviePayload })
  async findMovieByName(@Param('name') name): Promise<ReturnMoviePayload> {
    const movie = await this.moviesService.findMovieByName(name);

    return {
      movie,
      message: 'Filme encontrado com sucesso!',
    };
  }

  @Get()
  @ApiOkResponse({ type: MovieFilterPayload })
  async findMovie(
    @Body(ValidationPipe) movieFilterPayload: MovieFilterPayload,
  ) {
    const movies = await this.moviesService.findMovieByFilter(
      movieFilterPayload,
    );

    return {
      movies,
      message: 'Filmes encontrado com sucesso!',
    };
  }

  @Patch(':name')
  @ApiOkResponse({ type: MovieFilterPayload })
  async updateMovieByName(
    @Param('name') name,
    @Body(ValidationPipe) movieFilterPayload: MovieFilterPayload,
  ) {
    return await this.moviesService.updateMovieByName(name, movieFilterPayload);
  }

  @ApiOkResponse({
    description: 'Filme adicionado com sucesso',
    content: {
      'application/json': {
        example: 'Filme excluído com sucesso!',
      },
    },
  })
  @Delete(':name')
  async deleteMovieByName(
    @Param('name') name: string,
  ): Promise<{ message: string }> {
    await this.moviesService.deleteMovie(name);

    return {
      message: 'Filme excluido com sucesso!',
    };
  }
}
