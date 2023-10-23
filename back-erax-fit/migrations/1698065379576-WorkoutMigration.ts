import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutMigration1698065379576 implements MigrationInterface {
    name = 'WorkoutMigration1698065379576'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "files" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "filename" character varying NOT NULL, "path" character varying, CONSTRAINT "PK_6c16b9093a142e0e7613b04a3d9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "filename"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "path"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workouts" ADD "path" character varying`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "filename" character varying NOT NULL`);
        await queryRunner.query(`DROP TABLE "files"`);
    }

}
