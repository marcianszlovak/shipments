import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../auth/user.entity';
import { Shipment } from '../shipment/shipment.entity';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  username: 'marci',
  password: 'password',
  database: 'shipments',
  entities: [User, Shipment],
  synchronize: true,
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  migrationsRun: true,
};
