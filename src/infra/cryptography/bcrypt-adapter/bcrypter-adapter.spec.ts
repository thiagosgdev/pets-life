import bcrypt from "bcrypt";
import { BcryptAdapter } from "./bcrypt-adapter";

jest.mock("bcrypt", () => ({
    async hash(): Promise<string> {
        return Promise.resolve("hash");
    },

    async compare(): Promise<boolean> {
        return Promise.resolve(true);
    },
}));

const salt = 12;

type SutTypes = {
    sut: BcryptAdapter;
};

const makeSut = (): SutTypes => {
    const sut = new BcryptAdapter(salt);
    return {
        sut,
    };
};

describe("Bcrypt Adapter", () => {
    describe("Hash", () => {
        test("Should call hash with correct values", async () => {
            const { sut } = makeSut();
            const hashSpy = jest.spyOn(bcrypt, "hash");
            await sut.hash("any_value");
            expect(hashSpy).toHaveBeenCalledWith("any_value", salt);
        });

        test("Should return the hashed value on success", async () => {
            const { sut } = makeSut();
            const hashed = await sut.hash("any_value");
            expect(hashed).toBe("hash");
        });

        test("Should throw if hash throws", async () => {
            const { sut } = makeSut();
            jest.spyOn(bcrypt, "hash").mockImplementationOnce(() => {
                throw new Error();
            });
            const promise = sut.hash("any_value");
            expect(promise).rejects.toThrow();
        });
    });

    describe("Compare", () => {
        test("Should call compare with correct values", async () => {
            const { sut } = makeSut();
            const hashSpy = jest.spyOn(bcrypt, "compare");
            await sut.compare("any_value", "hash");
            expect(hashSpy).toHaveBeenCalledWith("any_value", "hash");
        });

        test("Should return true if the compare succeds", async () => {
            const { sut } = makeSut();
            const compare = await sut.compare("any_value", "hash");
            expect(compare).toBe(true);
        });

        test("Should return false if the compare fails", async () => {
            const { sut } = makeSut();
            jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
                return false;
            });
            const isValid = await sut.compare("any_value", "hash");
            expect(isValid).toBe(false);
        });

        test("Should throw if hash throws", async () => {
            const { sut } = makeSut();
            jest.spyOn(bcrypt, "compare").mockImplementationOnce(() => {
                throw new Error();
            });
            const promise = sut.compare("any_value", "hash");
            expect(promise).rejects.toThrow();
        });
    });
});
