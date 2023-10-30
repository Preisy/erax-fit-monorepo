import { MigrationInterface, QueryRunner } from "typeorm";

export class Antropometrics1698691636402 implements MigrationInterface {
    name = 'Antropometrics1698691636402'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
        await queryRunner.query(`CREATE TABLE "forms" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "weight" double precision NOT NULL, "waist" double precision NOT NULL, "userId" integer NOT NULL, CONSTRAINT "PK_ba062fd30b06814a60756f233da" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "forms" ADD CONSTRAINT "FK_08f0ffcce17394ec4aafcbed2f9" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
        await queryRunner.query(`ALTER TABLE "forms" DROP CONSTRAINT "FK_08f0ffcce17394ec4aafcbed2f9"`);
        await queryRunner.query(`DROP TABLE "forms"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
