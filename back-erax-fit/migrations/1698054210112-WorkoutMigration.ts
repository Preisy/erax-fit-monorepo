import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutMigration1698054210112 implements MigrationInterface {
    name = 'WorkoutMigration1698054210112'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "FK_65ff5fd1913246288adad5dc75a"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "filename"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "path"`);
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
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP CONSTRAINT "PK_5b2319bf64a674d40237dbb1697"`);
        await queryRunner.query(`ALTER TABLE "workouts" DROP COLUMN "id"`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "id" uuid NOT NULL DEFAULT uuid_generate_v4()`);
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
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
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
        await queryRunner.query(`ALTER TABLE "workouts" ADD "path" character varying`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD "filename" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "workouts" ADD CONSTRAINT "FK_65ff5fd1913246288adad5dc75a" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
