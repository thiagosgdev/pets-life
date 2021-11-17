import { Encrypter, HashComparer, Hasher } from "@/data/protocols/cryptography";

export const mockHasher = (): Hasher => {
    class HasherStub {
        async hash(value: string): Promise<string> {
            return Promise.resolve("any_password");
        }
    }
    return new HasherStub();
};

export const mockHashComparer = (): HashComparer => {
    class HashComparerStub implements HashComparer {
        async compare(value: string, hash: string): Promise<boolean> {
            return Promise.resolve(true);
        }
    }
    return new HashComparerStub();
};

export const mockEncrypter = (): Encrypter => {
    class EncrypterStub implements Encrypter {
        async encrypt(data: string): Promise<string> {
            return Promise.resolve("any_token");
        }
    }
    return new EncrypterStub();
};
