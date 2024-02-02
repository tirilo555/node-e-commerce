import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';
import dotenv from 'dotenv';

dotenv.config();

export const ormConfigExtra = {
  // connectionLimit: process.env.DATABASE_CONNECTION_LIMIT
  //   ? Number(process.env.DATABASE_CONNECTION_LIMIT)
  //   : 4,
  // bigNumberStrings: false,
  // multipleStatements:
  //   process.env.TYPEORM_MULTIPLE_STATEMENTS === 'true' ||
  //   process.env.TYPEORM_MULTIPLE_STATEMENTS === '1',

  connectionLimit: 4,
  bigNumberStrings: false,
  multipleStatements: false,
};

export const ormConfigDefault: MysqlConnectionOptions = {
  // name: 'default',
  // type: 'mariadb',
  // url:
  //   process.env.NODE_ENV !== 'test'
  //     ? process.env.TMS_DATABASE
  //     : process.env.TMS_DATABASE_TEST,
  // charset: 'utf8mb4_unicode_ci',
  // connectTimeout: 60 * 1000,
  // acquireTimeout: 60 * 1000,
  // logging: ['error'],
  // extra: ormConfigExtra,

  name: 'default',
  type: 'mariadb',
  url: process.env.APP_DATABASE,
  charset: 'utf8mb4_unicode_ci',
  connectTimeout: 60 * 1000,
  acquireTimeout: 60 * 1000,
  logging: ['error'],
  entitySkipConstructor: true,
  extra: ormConfigExtra,
  entities: [`${__dirname}/../db/models/*.model.{ts,js}`],
  migrations: [`${__dirname}/../db/migrations/*.{ts,js}`],
  subscribers: [`${__dirname}/../db/subscribers/*.subscriber.{ts,js}`],
  migrationsTableName: 'migrations',
};
