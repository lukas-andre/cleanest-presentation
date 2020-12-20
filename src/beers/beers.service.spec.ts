import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { MockBeerRepository } from '../../test/fixtures/mockBeerRepository';
import { BeersService } from './beers.service';
import { Beer } from './entities/beer.entity';

describe('BeersService', () => {
  let service: BeersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(Beer),
          useClass: MockBeerRepository,
        },
        BeersService,
      ],
    }).compile();

    service = module.get<BeersService>(BeersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
