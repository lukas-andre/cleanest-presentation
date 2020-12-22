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
    controllers: ['BeersController'],
  },
  {
    role: 'customer',
    controllers: [
      'AuthController',
      'UsersController',
      'BeersController',
      'OrdersController',
    ],
  },
];
