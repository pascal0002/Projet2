export class DataBaseError extends Error {
    public constructor(message: string) {
        super();
        this.message = message;
    }
}
