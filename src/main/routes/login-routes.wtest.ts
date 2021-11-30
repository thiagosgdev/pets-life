import { connection } from "@/infra/db/typeorm/helpers/typeorm-helper";
import request from "supertest";
import app from "../config/app";

describe("Login Routes", () => {
    beforeAll(async () => {
        let migrations = await connection.create();
        await migrations.runMigrations();
    });

    beforeEach(async () => {
        await connection.clear();
    });
    afterAll(async () => {
        await connection.close();
    });

    describe("POST /signup", () => {
        test("Should return 200 on signup success", async () => {
            await request(app)
                .post("/api/signup")
                .send({
                    name: "Thiago",
                    last_name: "Gonçalves",
                    cellphone: "99999999999",
                    zip_code: "11111111",
                    email: "any_email@mail.com",
                    password: "1234",
                })
                .expect(200);
        });
    });
});
