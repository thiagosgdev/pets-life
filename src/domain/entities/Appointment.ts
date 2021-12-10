import {
    Column,
    CreateDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("appointments")
export class Appointment {
    @PrimaryColumn()
    id: string;

    @Column()
    description: string;

    @Column()
    pet_id: string;

    @Column()
    doctor_name: string;

    @Column()
    scheduled_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuidV4();
        }
    }
}
