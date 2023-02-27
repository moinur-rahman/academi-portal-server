import { MigrationInterface, QueryRunner } from "typeorm";

export class TeacherTokens1677526019826 implements MigrationInterface {
    name = 'TeacherTokens1677526019826'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" ADD "tokens" text array`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "tokens"`);
    }

}
