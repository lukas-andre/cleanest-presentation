import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { NotFoundException } from '@nestjs/common';
import { Connection } from 'typeorm';
import {
  createMockRepository,
  MockRepository,
} from '../../test/utils/mockRepository';
import { Beer } from './entities/beer.entity';
import { BeersService } from './beers.service';
import mockBeer from '../../test/fixtures/mock-beer-list';
import { UpdateBeerDto } from './dto/update-beer.dto';

describe('BeersService', () => {
  let service: BeersService;
  let beerRepository: MockRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        { provide: Connection, useValue: {} },
        {
          provide: getRepositoryToken(Beer),
          useValue: createMockRepository(),
        },
        BeersService,
      ],
    }).compile();
    service = module.get<BeersService>(BeersService);
    beerRepository = module.get<MockRepository>(getRepositoryToken(Beer));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('Should return a beer array with length 3', async () => {
    beerRepository.find.mockImplementationOnce(() => Promise.resolve(mockBeer));
    const result = await service.findAll();
    expect(result).toHaveLength(3);
  });

  describe('Error cases', () => {
    it('Should throw an error when attempt find one beer entity', () => {
      const idToSearch = 1;
      beerRepository.findOne.mockImplementationOnce(() =>
        Promise.resolve(null),
      );
      service.findOne(idToSearch).catch(err => {
        expect(err).toBeInstanceOf(NotFoundException);
      });
    });

    it('Should throw an error when attempt update a beer', () => {
      const [beerToUpdate] = mockBeer;
      const beerToUpdateDto: UpdateBeerDto = beerToUpdate as UpdateBeerDto;
      beerRepository.findOne.mockImplementationOnce(() =>
        Promise.resolve(null),
      );
      service
        .update(beerToUpdate.id, {
          ...beerToUpdateDto,
          name: 'Other Beer Name',
        })
        .catch(err => {
          expect(err).toBeInstanceOf(NotFoundException);
        });
    });
  });
});
