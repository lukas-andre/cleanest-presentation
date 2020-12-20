import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../test/utils/mockRepository';
import { BeersController } from './beers.controller';
import { BeersService } from './beers.service';
import { Beer } from './entities/beer.entity';

describe('BeersController', () => {
  let controller: BeersController;
  let beerRepository: MockRepository;
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BeersController],
      providers: [
        {
          provide: getRepositoryToken(Beer),
          useValue: createMockRepository(),
        },
        BeersService,
      ],
    }).compile();

    controller = module.get<BeersController>(BeersController);
    beerRepository = module.get<MockRepository>(getRepositoryToken(Beer));
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
