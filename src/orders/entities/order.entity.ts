import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../global/entities/base.entity';

@Entity()
export class Order extends BaseEntity {
  @Column({ name: 'beer_id' })
  beerId: string;

  @Column({ name: 'customer_rut' })
  customerRut: string;

  @Column({ nullable: true, default: 1 })
  quantity: number;
}
