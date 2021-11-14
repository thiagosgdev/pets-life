import { JwtAdapter } from "./jwt-adapter";

import jwt from "jsonwebtoken";

jest.mock("jsonwebtoken", () => ({
    async sign(): Promise<string> {
        return Promise.resolve("any_token");
    },
}));

describe("JWT-Adapter", () => {
    describe("Encrypt", () => {
        type SutTypes = {
            sut: JwtAdapter;
        };
        const makeSut = (): SutTypes => {
            const sut = new JwtAdapter("secret");
            return {
                sut,
            };
        };
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
    });
});
