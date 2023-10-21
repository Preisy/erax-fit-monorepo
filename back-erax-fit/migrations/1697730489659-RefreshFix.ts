import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshFix1697730489659 implements MigrationInterface {
    name = 'RefreshFix1697730489659'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "tokenId" integer`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_d98a275f8bc6cd986fcbe2eab01" UNIQUE ("tokenId")`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01" FOREIGN KEY ("tokenId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_d98a275f8bc6cd986fcbe2eab01"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_d98a275f8bc6cd986fcbe2eab01"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "tokenId"`);
    }

}
