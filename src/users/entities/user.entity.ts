import { Entity, Column, ManyToOne } from 'typeorm';
import { Role } from './role.entity';
import { BaseEntity } from 'src/global/entities/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true, default: true })
  active: boolean;

  @ManyToOne(type => Role, { cascade: false, nullable: true })
  role: Role;
}
