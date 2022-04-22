import { MigrationInterface, QueryRunner } from 'typeorm';

export class createClientsTable1650592882929 implements MigrationInterface {
  name = 'createClientsTable1650592882929';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "Clients" ("id" SERIAL NOT NULL, "email" character varying(256) NOT NULL, "name" character varying(256), CONSTRAINT "UQ_38fd02fc8a88ed82f0c1e6eee4e" UNIQUE ("email"), CONSTRAINT "PK_8dadaa0dc6305d95e1d1a6b9544" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "Clients"`);
  }
}
