import { ErrorData } from "./error-data"

export class HttpError extends Error {
    status: number
    errorData?: ErrorData

    constructor(
        message: string,
        status: number,
        errorData?: ErrorData
    ) {
        super(message)
        this.status = status
        this.errorData = errorData
    }

    addError(key: string, message: string): HttpError {
        if (!this.errorData) this.errorData = {}
        if (!this.errorData[key]) this.errorData[key] = []
        this.errorData[key].push({ message })
        return this
    }
}