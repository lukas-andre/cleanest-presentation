import { Injectable } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Beer } from '../../src/beers/entities/beer.entity';

@EntityRepository(Beer)
@Injectable()
export class MockBeerRepository extends Repository<Beer> {}
