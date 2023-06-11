import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { Testimonial } from './entity/Testimonial';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'kpn_practical',
  synchronize: true, // for production synchronize will false and use migration
  logging: false,
  entities: [Testimonial],
  migrations: [],
  subscribers: [],
});
