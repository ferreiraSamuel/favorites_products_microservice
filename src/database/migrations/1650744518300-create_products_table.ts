import { MigrationInterface, QueryRunner } from 'typeorm';

export class createProductsTable1650744518300 implements MigrationInterface {
  name = 'createProductsTable1650744518300';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "products" ("id" SERIAL NOT NULL, "external_id" character varying(256) NOT NULL, "title" character varying(256) NOT NULL, "brand" character varying(256), "image" character varying(256), "price" double precision NOT NULL, CONSTRAINT "UQ_bbc46f4fc336522e99fc8782b43" UNIQUE ("external_id"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "clients_favorites_products" ("clientsId" integer NOT NULL, "productsId" integer NOT NULL, CONSTRAINT "PK_87ac955d1d10fe6a7d4c4266b83" PRIMARY KEY ("clientsId", "productsId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_68167f3325c31f3a0653e6367a" ON "clients_favorites_products" ("clientsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_fa37ccaf6cef1475e777a8c80c" ON "clients_favorites_products" ("productsId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_favorites_products" ADD CONSTRAINT "FK_68167f3325c31f3a0653e6367ae" FOREIGN KEY ("clientsId") REFERENCES "clients"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_favorites_products" ADD CONSTRAINT "FK_fa37ccaf6cef1475e777a8c80c1" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "clients_favorites_products" DROP CONSTRAINT "FK_fa37ccaf6cef1475e777a8c80c1"`,
    );
    await queryRunner.query(
      `ALTER TABLE "clients_favorites_products" DROP CONSTRAINT "FK_68167f3325c31f3a0653e6367ae"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_fa37ccaf6cef1475e777a8c80c"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_68167f3325c31f3a0653e6367a"`,
    );
    await queryRunner.query(`DROP TABLE "clients_favorites_products"`);
    await queryRunner.query(`DROP TABLE "products"`);
  }
}
