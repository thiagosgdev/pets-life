import { JwtAdapter } from "./jwt-adapter";

import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
    async sign(): Promise<string> {
        return Promise.resolve("any_token");
    },
    async verify(): Promise<string> {
        return Promise.resolve("any_value");
    },
}));

describe("JWT-Adapter", () => {
    type SutTypes = {
        sut: JwtAdapter;
    };
    const makeSut = (): SutTypes => {
        const sut = new JwtAdapter("secret");
        return {
            sut,
        };
    };
    describe("Encrypt", () => {
        test("Should call encrypt with the correct value", async () => {
            const { sut } = makeSut();
            const encryptSpy = jest.spyOn(jwt, "sign");
            await sut.encrypt("any_value");
            expect(encryptSpy).toHaveBeenCalledWith(
                { id: "any_value" },
                "secret",
            );
        });

        test("Should return token on encrypt success", async () => {
            const { sut } = makeSut();
            const accessToken = await sut.encrypt("any_value");
            expect(accessToken).toBe("any_token");
        });

        test("Should throw if sign throws", async () => {
            const { sut } = makeSut();
            jest.spyOn(jwt, "sign").mockImplementationOnce(() => {
                throw new Error();
            });
            const promise = sut.encrypt("any_value");
            expect(promise).rejects.toThrow();
        });
    });

    describe("Decrypt", () => {
        test("Should call verify with the correct values", async () => {
            const { sut } = makeSut();
            const verifySpy = jest.spyOn(jwt, "verify");
            await sut.decrypt("any_token");
            expect(verifySpy).toHaveBeenCalledWith("any_token", "secret");
        });

        test("Should return the correct value on verify success", async () => {
            const { sut } = makeSut();
            const value = await sut.decrypt("any_token");
            expect(value).toBe("any_value");
        });

        test("Should throw if verify throws", async () => {
            const { sut } = makeSut();
            jest.spyOn(jwt, "verify").mockImplementationOnce(() => {
                throw new Error();
            });
            const promise = sut.decrypt("any_token");
            expect(promise).rejects.toThrow();
        });
    });
});
