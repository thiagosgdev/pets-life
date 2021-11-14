export interface LogErrorRepository {
    logError(controller: string, message: string): Promise<void>;
}
