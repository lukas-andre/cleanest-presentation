import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { BeerTypes } from '../enum/beer-types.enum';

@Entity()
export class Beer {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  price: number;
  @Column()
  type: BeerTypes;
}
