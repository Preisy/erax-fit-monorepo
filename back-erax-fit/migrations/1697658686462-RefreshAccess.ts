import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshAccess1697658686462 implements MigrationInterface {
    name = 'RefreshAccess1697658686462'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_base_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_ac4058ad7b0a39a9ec865d0962e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "hash" character varying(256), "refresh_hash" character varying(256), CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "rt_hash"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "rt_hash" character varying(256)`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hash" character varying(256)`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP TABLE "app_base_entity"`);
    }

}
