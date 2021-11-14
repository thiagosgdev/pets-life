import { LogErrorRepository } from "@/data/protocols/db/log/log-error-repository";
import { Log } from "@/domain/entities/Log";
import { getRepository, Repository } from "typeorm";

export class LogPostgresRepository implements LogErrorRepository {
    private repository: Repository<Log>;

    constructor() {
        this.repository = getRepository(Log);
    }

    async logError(controller: string, message: string): Promise<void> {
        const log = this.repository.create({ controller, message });
        await this.repository.save(log);
    }
}
