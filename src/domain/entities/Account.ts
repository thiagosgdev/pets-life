import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("accounts")
export class Account {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    last_name: string;

    @Column()
    cellphone: string;

    @Column()
    zip_code: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column()
    token: string;

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
