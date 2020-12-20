import { registerAs } from '@nestjs/config';

export default registerAs('orderDb', () => ({
  type: 'postgres',
  name: 'example-order-db',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: 'example-order',
  port: 5432,
  entities: [__dirname + '/../orders/**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC,
  logging: true,
}));
