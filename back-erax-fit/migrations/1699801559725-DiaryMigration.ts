import { MigrationInterface, QueryRunner } from "typeorm";

export class DiaryMigration1699801559725 implements MigrationInterface {
    name = 'DiaryMigration1699801559725'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "antropometrics" DROP CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069"`);
        await queryRunner.query(`CREATE TABLE "diary-templates" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "stepsGoal" integer NOT NULL, "userId" integer NOT NULL, CONSTRAINT "REL_5f67fdf2ae7685f78b8733f505" UNIQUE ("userId"), CONSTRAINT "PK_43edc370c8c6ed22c73a9e032a1" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "self-control-props" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "value" integer, "templateId" integer NOT NULL, CONSTRAINT "PK_813c99a0faf2a6f33a336ec3887" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "antropometrics" ADD CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "diary-templates" ADD CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "self-control-props" ADD CONSTRAINT "FK_41401b301c1635ea93d66dca9a7" FOREIGN KEY ("templateId") REFERENCES "diary-templates"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "self-control-props" DROP CONSTRAINT "FK_41401b301c1635ea93d66dca9a7"`);
        await queryRunner.query(`ALTER TABLE "diary-templates" DROP CONSTRAINT "FK_5f67fdf2ae7685f78b8733f5058"`);
        await queryRunner.query(`ALTER TABLE "antropometrics" DROP CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069"`);
        await queryRunner.query(`DROP TABLE "self-control-props"`);
        await queryRunner.query(`DROP TABLE "diary-templates"`);
        await queryRunner.query(`ALTER TABLE "antropometrics" ADD CONSTRAINT "FK_05acb8ac364df5b594cd9fd5069" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

}
