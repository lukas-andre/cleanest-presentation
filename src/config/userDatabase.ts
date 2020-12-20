import { registerAs } from '@nestjs/config';

export default registerAs('userDb', () => ({
  type: 'postgres',
  name: 'example-user-db',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: 'example-user',
  port: 5432,
  entities: [__dirname + '/../{users,beers}/**/*.entity{.ts,.js}'],
  synchronize: Boolean(process.env.TYPEORM_SYNC),
  logging: true,
}));
