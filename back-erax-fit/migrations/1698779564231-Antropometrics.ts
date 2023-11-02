import { MigrationInterface, QueryRunner } from 'typeorm';

export class Antropometrics1698779564231 implements MigrationInterface {
  name = 'Antropometrics1698779564231';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(
      `CREATE TABLE "antropometrics" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer NOT NULL, "weight" double precision NOT NULL, "waist" double precision NOT NULL, "abdomen" double precision NOT NULL, "shoulder" double precision NOT NULL, "hip" double precision NOT NULL, "hipVolume" double precision NOT NULL, CONSTRAINT "PK_227358fe517ea3230ab655c3682" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "antropometrics" ADD CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
    await queryRunner.query(`ALTER TABLE "antropometrics" DROP CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069"`);
    await queryRunner.query(`DROP TABLE "antropometrics"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`,
    );
  }
}
