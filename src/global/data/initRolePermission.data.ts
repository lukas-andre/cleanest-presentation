export interface InitRolePermissions {
  role: string;
  controllers: string[];
}

export const initRolePermissions: InitRolePermissions[] = [
  {
    role: 'admin',
    controllers: ['*'],
  },
  {
    role: 'beer',
    controllers: ['*'],
  },
  {
    role: 'lessor',
    controllers: ['AuthController', 'UsersController'],
  },
];
