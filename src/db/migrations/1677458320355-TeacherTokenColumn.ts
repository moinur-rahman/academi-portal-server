import { MigrationInterface, QueryRunner } from "typeorm";

export class TeacherTokenColumn1677458320355 implements MigrationInterface {
    name = 'TeacherTokenColumn1677458320355'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" ADD "tokens" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "teacher" DROP COLUMN "tokens"`);
    }

}
