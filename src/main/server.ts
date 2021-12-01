import { connection } from "@/infra/db/typeorm/helpers/typeorm-helper";

connection
    .init()
    .then(async () => {
        const app = (await import("./config/app")).default;
        app.listen(3001, () =>
            console.log(`Server running at http://localhost:3001`),
        );
    })
    .catch(console.error);
