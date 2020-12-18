import { BaseEntity } from 'src/global/entities/base.entity';
import { Entity, Column } from 'typeorm';

@Entity()
export class Permission extends BaseEntity {
  @Column({ unique: true })
  controller: string;

  @Column()
  action: string;

  @Column({ nullable: true })
  description: string;
}
