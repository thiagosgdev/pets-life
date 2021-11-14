import { HashComparer } from "@/data/protocols/cryptography/Hash-Comparer";
import { Hasher } from "@/data/protocols/cryptography/Hasher";
import { hash, compare } from "bcrypt";

export class BcryptAdapter implements Hasher {
    constructor(private readonly salt: number) {}

    async hash(value: string): Promise<string> {
        const hashed = await hash(value, this.salt);
        return hashed;
    }
}
