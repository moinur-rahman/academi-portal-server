import { MigrationInterface, QueryRunner } from "typeorm";

export class StudentTokens1677526193748 implements MigrationInterface {
    name = 'StudentTokens1677526193748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" ADD "tokens" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student" DROP COLUMN "tokens"`);
    }

}
