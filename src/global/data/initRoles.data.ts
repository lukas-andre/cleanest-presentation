import { Role } from 'src/users/entities/role.entity';

export const initRoles: Partial<Role>[] = [
  {
    id: 1,
    name: 'admin',
    description: 'Administrator Role',
  },
  {
    id: 2,
    name: 'beer',
    description: 'Beer Role',
  },
  {
    id: 3,
    name: 'customer',
    description: 'Customer Role',
  },
];
