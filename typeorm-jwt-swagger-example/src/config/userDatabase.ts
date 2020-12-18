import { registerAs } from '@nestjs/config';

export default registerAs('userDb', () => ({
  type: 'mysql',
  name: 'user-db',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: 'example-user',
  port: parseInt(process.env.DB_PORT, 5432),
  entities: [__dirname + '/../users/**/*.entity{.ts,.js}'],
  synchronize: process.env.TYPEORM_SYNC,
  logging: true,
}));