import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutMigration1697704096398 implements MigrationInterface {
    name = 'WorkoutMigration1697704096398'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "app_base_entity" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_ac4058ad7b0a39a9ec865d0962e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "first_name" character varying, "last_name" character varying, "role" character varying NOT NULL DEFAULT 'client', "email" character varying NOT NULL, "password" character varying(128) NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "workouts" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "comment" character varying, "date" TIMESTAMP NOT NULL, "loop" integer, "userId" integer, CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "exercises" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "trainer_comment" character varying, "weight" integer NOT NULL, "sets" integer NOT NULL, "repetitions" integer NOT NULL, "rest_time" integer NOT NULL, "pace" character varying NOT NULL, "photo_link" character varying NOT NULL, "video_link" character varying NOT NULL, "workoutId" integer, CONSTRAINT "PK_c4c46f5fa89a58ba7c2d894e3c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "loop"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "comment" character varying`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "loop" integer`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "filename" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "path" character varying`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "PK_5b2319bf64a674d40237dbb1697"`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "PK_5b2319bf64a674d40237dbb1697"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "id" SERIAL NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "PK_5b2319bf64a674d40237dbb1697" PRIMARY KEY ("id")`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "path"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "filename"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "userId"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "loop"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "date"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "comment"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "deleted_at"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "updated_at"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "created_at"`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "userId" integer`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "loop" integer`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "date" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "comment" character varying`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "deleted_at" TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "updated_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "created_at" TIMESTAMP NOT NULL DEFAULT now()`);
        await queryRunner.query(`DROP TABLE "exercises"`);
        await queryRunner.query(`DROP TABLE "workouts"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "app_base_entity"`);
    }

}
