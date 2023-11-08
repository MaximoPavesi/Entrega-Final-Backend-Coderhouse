export default class CustomError extends Error {
    constructor(name, cause, message) {
        super(message);
        this.name = name;
        this.cause = cause;
    }

    static createCustomError({ name, cause, message }) {
        return new CustomError(name, cause, message);
    }
}
