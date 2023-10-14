import { MigrationInterface, QueryRunner } from "typeorm";

export class Registration1697291098911 implements MigrationInterface {
    name = 'Registration1697291098911'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "hash"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "age" smallint NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "height" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "weight" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "weight_in_youth" double precision NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "nutrition_restrictions" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "allergy" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "gastro_deseases" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "meal_intolerance" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "insulin_resistance" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "kidney_desease" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "heart_desease" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "muscle_desease" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "load_restrictions" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "sports_exp" character varying(128) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "goals" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "rt_hash" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "rt_hash" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "goals"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "sports_exp"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "load_restrictions"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "muscle_desease"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "heart_desease"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "kidney_desease"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "insulin_resistance"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "meal_intolerance"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "gastro_deseases"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "allergy"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "nutrition_restrictions"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "weight_in_youth"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "weight"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "height"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "users" ADD "hash" character varying(256)`);
    }

}
