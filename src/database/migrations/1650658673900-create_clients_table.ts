import { MigrationInterface, QueryRunner } from 'typeorm';

export class createClientsTable1650658673900 implements MigrationInterface {
  name = 'createClientsTable1650658673900';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "clients" ("id" SERIAL NOT NULL, "email" character varying(256) NOT NULL, "name" character varying(256), "password" character varying(256) NOT NULL, CONSTRAINT "UQ_b48860677afe62cd96e12659482" UNIQUE ("email"), CONSTRAINT "PK_f1ab7cf3a5714dbc6bb4e1c28a4" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "clients"`);
  }
}
