import { MigrationInterface, QueryRunner } from "typeorm";
export declare class CreateUsers1621084374493 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
