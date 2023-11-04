import { MigrationInterface, QueryRunner } from "typeorm";

export class FoodMigration1699094501108 implements MigrationInterface {
    name = 'FoodMigration1699094501108'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
        await queryRunner.query(`CREATE TABLE "food" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, "type" character varying NOT NULL, "category" integer NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_26d12de4b6576ff08d30c281837" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
        await queryRunner.query(`DROP TABLE "food"`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE SET NULL ON UPDATE CASCADE`);
    }

}
