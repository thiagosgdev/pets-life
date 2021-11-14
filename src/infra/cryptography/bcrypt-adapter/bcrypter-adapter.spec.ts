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
            const hashSpy = jest.spyOn(sut, "hash");
            await sut.hash("any_value");
            expect(hashSpy).toHaveBeenCalledWith("any_value");
        });

        test("Should return the hashed value on success", async () => {
            const { sut } = makeSut();
            jest.spyOn(sut, "hash").mockReturnValueOnce(
                Promise.resolve("any_hashed"),
            );
            const hashed = await sut.hash("any_value");
            expect(hashed).toBe("any_hashed");
        });
    });
});
