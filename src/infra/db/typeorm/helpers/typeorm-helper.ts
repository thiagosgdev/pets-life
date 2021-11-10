import {
    createConnection,
    getConnection,
    getConnectionOptions,
    Connection,
} from "typeorm";

export const connection = {
    async create() {
        const defaultOptions = await getConnectionOptions();
        await createConnection(
            Object.assign(defaultOptions, {
                database:
                    process.env.NODE_ENV === "develop"
                        ? "db_pets_test"
                        : defaultOptions.database,
            }),
        );
    },
    async close() {
        await getConnection().close();
    },

    async clear() {
        const connection = getConnection();
        const entities = getConnection().entityMetadatas;
        entities.forEach(async entity => {
            const repository = connection.getRepository(entity.name);
            await repository.query(`DELETE FROM ${entity.tableName}`);
        });
    },
};
