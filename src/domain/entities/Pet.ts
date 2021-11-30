import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";
import { Account } from "./Account";
import { v4 as uuidV4 } from "uuid";

@Entity("pets")
export class Pet {
    @PrimaryColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    birthdate: Date;

    @Column()
    chip_number: string;

    @Column()
    chip_website: string;

    @Column()
    gender: "male" | "female";

    @Column()
    breed: string;

    @Column()
    weigth: number;

    @Column()
    account_id: string;

    @ManyToOne(() => Account)
    @JoinColumn({ name: "account_id" })
    account: Account;

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
