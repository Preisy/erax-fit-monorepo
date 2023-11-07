import { MigrationInterface, QueryRunner } from 'typeorm';

export class BonusVideo1699374984097 implements MigrationInterface {
  name = 'BonusVideo1699374984097';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "antropometrics" DROP CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069"');
    await queryRunner.query(
      'CREATE TABLE "video" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "fileName" character varying NOT NULL, "path" character varying NOT NULL, "fileLInk" character varying NOT NULL, CONSTRAINT "PK_1a2f3856250765d72e7e1636c8e" PRIMARY KEY ("id"))',
    );
    await queryRunner.query('ALTER TABLE "users" ADD "canWatchVideo" boolean DEFAULT \'false\'');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "canWatchVideo" DROP DEFAULT');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "canWatchVideo" SET NOT NULL');
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
    await queryRunner.query(
      'ALTER TABLE "antropometrics" ADD CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "antropometrics" DROP CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069"');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "canWatchVideo"');
    await queryRunner.query('DROP TABLE "video"');
    await queryRunner.query(
      'ALTER TABLE "antropometrics" ADD CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE',
    );
    await queryRunner.query(
      'ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE',
    );
  }
}
