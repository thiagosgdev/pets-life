import { Connection, createConnection, getConnectionOptions } from "typeorm";

export const newConnection = async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();
    return createConnection(defaultOptions);
};
