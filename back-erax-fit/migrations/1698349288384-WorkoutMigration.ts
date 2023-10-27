import { MigrationInterface, QueryRunner } from "typeorm";

export class WorkoutMigration1698349288384 implements MigrationInterface {
    name = 'WorkoutMigration1698349288384'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "exercises" DROP CONSTRAINT "FK_d70ac1ace13bee963fd187f754d"`);
        await queryRunner.query(`ALTER TABLE "exercises" ADD CONSTRAINT "FK_d70ac1ace13bee963fd187f754d" FOREIGN KEY ("workoutId") REFERENCES "workouts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
