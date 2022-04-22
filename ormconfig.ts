const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} = process.env;

const isProd = process.env.NODE_ENV == 'production';

const options = {
  type: 'postgres',
  host:
    DATABASE_HOST == 'favorites_products_database'
      ? 'localhost'
      : DATABASE_HOST,
  database: DATABASE_NAME,
  password: DATABASE_PASSWORD,
  port: Number(DATABASE_PORT),
  username: DATABASE_USER,
  entities: [
    isProd
      ? 'dist/src/modules/**/entities/*.entity.js'
      : 'src/modules/**/entities/*.entity.ts',
  ],
  migrations: [
    isProd
      ? 'dist/src/database/migrations/*.js'
      : 'src/database/migrations/*.ts',
  ],
  migrationsRun: true,
  synchronize: true,
  cli: {
    migrationsDir: isProd
      ? 'dist/src/database/migrations'
      : 'src/database/migrations',
  },
};

export default options;
