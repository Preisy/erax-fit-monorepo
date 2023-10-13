import { MigrationInterface, QueryRunner } from "typeorm";

export class RefreshAccess1697141560882 implements MigrationInterface {
  name = 'RefreshAccess1697141560882'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "rt_hash" DROP NOT NULL`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "rt_hash" SET NOT NULL`);
  }

}
