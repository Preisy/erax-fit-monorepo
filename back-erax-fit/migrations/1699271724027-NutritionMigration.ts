import { MigrationInterface, QueryRunner } from "typeorm";

export class NutritionMigration1699271724027 implements MigrationInterface {
    name = 'NutritionMigration1699271724027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "nutrition" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "userId" integer NOT NULL, CONSTRAINT "REL_b53992099fc6f0518034426576" UNIQUE ("userId"), CONSTRAINT "PK_e8da4724c54762e994d879b11c3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meals" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "name" character varying NOT NULL, "nutritionId" integer NOT NULL, CONSTRAINT "PK_e6f830ac9b463433b58ad6f1a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "meal-items" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "category" integer NOT NULL, "type" character varying NOT NULL, "quantity" integer NOT NULL, "mealId" integer NOT NULL, CONSTRAINT "PK_9ca583c20b7ec790a47a679e0ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "nutrition" ADD CONSTRAINT "FK_b53992099fc6f05180344265762" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meals" ADD CONSTRAINT "FK_580e0d2bb1c888feb3f7f14f7c0" FOREIGN KEY ("nutritionId") REFERENCES "nutrition"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "meal-items" ADD CONSTRAINT "FK_5757970ddda651b2108f85cd67b" FOREIGN KEY ("mealId") REFERENCES "meals"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "meal-items" DROP CONSTRAINT "FK_5757970ddda651b2108f85cd67b"`);
        await queryRunner.query(`ALTER TABLE "meals" DROP CONSTRAINT "FK_580e0d2bb1c888feb3f7f14f7c0"`);
        await queryRunner.query(`ALTER TABLE "nutrition" DROP CONSTRAINT "FK_b53992099fc6f05180344265762"`);
        await queryRunner.query(`DROP TABLE "meal-items"`);
        await queryRunner.query(`DROP TABLE "meals"`);
        await queryRunner.query(`DROP TABLE "nutrition"`);
    }

}
