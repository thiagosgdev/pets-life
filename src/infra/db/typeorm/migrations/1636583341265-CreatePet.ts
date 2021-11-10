import { table } from "console";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreatePet1636583341265 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pets",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "name",
                        type: "varchar",
                    },
                    {
                        name: "birthdate",
                        type: "timestamp",
                    },
                    {
                        name: "chip_number",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "chip_website",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "gender",
                        type: "varchar",
                    },
                    {
                        name: "breed",
                        type: "varchar",
                    },
                    {
                        name: "weigth",
                        type: "varchar",
                    },
                    {
                        name: "account_id",
                        type: "uuid",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKAccountPet",
                        referencedTableName: "accounts",
                        referencedColumnNames: ["id"],
                        columnNames: ["account_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pets");
    }
}
