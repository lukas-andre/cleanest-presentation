import { BaseEntity } from '../../global/entities/base.entity';
import { Column, Entity } from 'typeorm';
import { BeerTypes } from '../enum/beer-types.enum';

@Entity()
export class Beer extends BaseEntity {
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  type: BeerTypes;
}
