import { MigrationInterface, QueryRunner } from 'typeorm';

export class Seed2617378125500 implements MigrationInterface {
  name = 'Seed2617378125500';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      "INSERT INTO users (email, first_name, last_name, \"role\", \"password\") VALUES ('a@mail.ru', 'Admin', 'Adminovich', 'admin', '$2b$10$NiyA7SyeXWmbyTBEvs8Xou01CEE7TaWCNN9XeQNOfV.YsVGls.3Y2')",
    );
    await queryRunner.query(
      "INSERT INTO users (email, first_name, last_name, \"role\", \"password\") VALUES ('c1@mail.ru', 'Client', 'Clientovich', 'client', '$2b$10$NiyA7SyeXWmbyTBEvs8Xou01CEE7TaWCNN9XeQNOfV.YsVGls.3Y2')",
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query("delete from users where email = 'a@mail.ru';");
    await queryRunner.query("delete from users where email = 'c1@mail.ru';");
  }
}
