import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AddMoviePayload } from './models/add-movie.payload';
import { MovieFilterPayload } from './models/movie-filter.payload';
import { MovieRepository } from './movies.repository';
import { MoviesService } from './movies.service';

const mockUserRepository = () => ({
  addMovie: jest.fn(),
  findMovieByName: jest.fn(),
  findMovieByFilter: jest.fn(),
  updateMovieByName: jest.fn(),
  deleteMovie: jest.fn(),
});

describe('MoviesService', () => {
  let movieRepository;
  let service;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: MovieRepository,
          useFactory: mockUserRepository,
        },
      ],
    }).compile();

    movieRepository = await module.get<MovieRepository>(MovieRepository);
    service = await module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(movieRepository).toBeDefined();
  });

  describe('addMovie', () => {
    let mockAddMovieDto: AddMoviePayload;

    beforeEach(() => {
      mockAddMovieDto = {
        name: 'mock',
        stars: 5,
        videoURL: 'www.google.com',
        year: 2003,
      };
    });

    it('should add a movie', async () => {
      movieRepository.addMovie.mockResolvedValue('mockMovie');
      const result = await service.addMovie(mockAddMovieDto);

      expect(movieRepository.addMovie).toHaveBeenCalledWith(mockAddMovieDto);
      expect(result).toEqual('mockMovie');
    });
  });

  describe('findMovieByName', () => {
    it('should find a movie by name', async () => {
      movieRepository.findMovieByName.mockResolvedValue('mockMovie');

      expect(movieRepository.findMovieByName).not.toHaveBeenCalled();

      const result = await service.findMovieByName('mockName');

      expect(result).toEqual('mockMovie');
    });

    it('should throw an error if movie not found', async () => {
      movieRepository.findMovieByName.mockResolvedValue(null);

      expect(service.findMovieByName('mockName')).rejects.toThrow(
        NotFoundException,
      );
    });
  });

  describe('findMovieByFilter', () => {
    let mockMovieFilterDto: MovieFilterPayload;

    beforeEach(() => {
      mockMovieFilterDto = {
        name: 'mockName',
        stars: 5,
        year: 2002,
      };
    });

    it('should find a movie by filter', async () => {
      movieRepository.findMovieByFilter.mockResolvedValue('mockMovie');
      const result = await service.findMovieByFilter(mockMovieFilterDto);

      expect(movieRepository.findMovieByFilter).toHaveBeenCalledWith(
        mockMovieFilterDto,
      );
      expect(result).toEqual('mockMovie');
    });
  });

  describe('updateMovieByName', () => {
    let mockMovieFilterDto: MovieFilterPayload;

    beforeEach(() => {
      mockMovieFilterDto = {
        name: 'mockName',
        stars: 5,
        year: 2002,
      };
    });

    it('should update Movie content by name', async () => {
      movieRepository.updateMovieByName.mockResolvedValue('mockMovie');
      const result = await service.updateMovieByName(
        'mockName',
        mockMovieFilterDto,
      );

      expect(movieRepository.updateMovieByName).toHaveBeenCalledWith(
        'mockName',
        mockMovieFilterDto,
      );
      expect(result).toEqual('mockMovie');
    });
  });
});
