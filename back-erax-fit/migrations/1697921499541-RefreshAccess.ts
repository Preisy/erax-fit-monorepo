import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshAccess1697921499541 implements MigrationInterface {
    name = 'RefreshAccess1697921499541'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "refresh_hash"`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "refreshHash" character varying(256) NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tokens" ALTER COLUMN "hash" SET NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tokens" ALTER COLUMN "hash" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP COLUMN "refreshHash"`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD "refresh_hash" character varying(256)`);
    }

}
