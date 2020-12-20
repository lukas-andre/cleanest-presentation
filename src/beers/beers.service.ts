import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBeerDto } from './dto/create-beer.dto';
import { UpdateBeerDto } from './dto/update-beer.dto';
import { Beer } from './entities/beer.entity';

@Injectable()
export class BeersService {
  constructor(
    @InjectRepository(Beer)
    private readonly beerRepository: Repository<Beer>,
  ) {}
  create(createBeerDto: CreateBeerDto): Promise<Beer> {
    const beer = this.beerRepository.create(createBeerDto);
    return this.beerRepository.save(beer);
  }

  findAll(): Promise<Beer[]> {
    return this.beerRepository.find();
  }

  async findOne(id: number): Promise<Beer> {
    const beer = await this.beerRepository.findOne(id);
    if (!beer) {
      throw new NotFoundException(`Beer #${id} not found`);
    }
    return beer;
  }

  async update(id: number, updateBeerDto: UpdateBeerDto): Promise<Beer> {
    const beer = await this.beerRepository.preload({
      id: +id,
      ...updateBeerDto,
    });
    if (!beer) {
      throw new NotFoundException(`Beer #${id} not found`);
    }
    return this.beerRepository.save(beer);
  }

  async remove(id: number): Promise<Beer> {
    const beer = await this.findOne(id);
    return this.beerRepository.remove(beer);
  }
}
