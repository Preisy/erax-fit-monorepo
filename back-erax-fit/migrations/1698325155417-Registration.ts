import { MigrationInterface, QueryRunner } from 'typeorm';

export class Registration1698325155417 implements MigrationInterface {
  name = 'Registration1698325155417';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "users" ADD "age" smallint');
    await queryRunner.query('ALTER TABLE "users" ADD "height" double precision ');
    await queryRunner.query('ALTER TABLE "users" ADD "weight" double precision ');
    await queryRunner.query('ALTER TABLE "users" ADD "weightInYouth" double precision');
    await queryRunner.query('ALTER TABLE "users" ADD "nutritRestrict" boolean');
    await queryRunner.query('ALTER TABLE "users" ADD "allergy" boolean');
    await queryRunner.query('ALTER TABLE "users" ADD "gastroDeseases" character varying(256)');
    await queryRunner.query('ALTER TABLE "users" ADD "mealIntolerance" character varying(256)');
    await queryRunner.query('ALTER TABLE "users" ADD "insulinResistance" boolean');
    await queryRunner.query('ALTER TABLE "users" ADD "kidneyDesease" character varying(128)');
    await queryRunner.query('ALTER TABLE "users" ADD "heartDesease" boolean');
    await queryRunner.query('ALTER TABLE "users" ADD "muscleDesease" character varying(128)');
    await queryRunner.query('ALTER TABLE "users" ADD "loadRestrictions" boolean');
    await queryRunner.query('ALTER TABLE "users" ADD "sportsExp" character varying(128)');
    await queryRunner.query('ALTER TABLE "users" ADD "goals" character varying(256)');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "goals"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "sportsExp"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "loadRestrictions"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "muscleDesease"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "heartDesease"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "kidneyDesease"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "insulinResistance"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "mealIntolerance"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "gastroDeseases"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "allergy"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "nutritRestrict"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "weightInYouth"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "weight"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "height"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "age"');
  }
}
