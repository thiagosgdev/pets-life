import { query } from "express";
import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateAppointment1639095090536 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "appointments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "description",
                        type: "varchar",
                    },
                    {
                        name: "pet_id",
                        type: "uuid",
                    },
                    {
                        name: "doctor_name",
                        type: "varchar",
                    },
                    {
                        name: "scheduled_date",
                        type: "timestamp",
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now ()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now ()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKPetAppointment",
                        referencedTableName: "pets",
                        referencedColumnNames: ["id"],
                        columnNames: ["pet_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("appointments");
    }
}
