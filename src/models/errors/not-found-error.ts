import { HttpError } from "./htttp-error";

export class HttpErrors {
    static notFound(message: string = 'Not Found') {
        return new HttpError(message, 404)
    }

    static badRequest(message: string = 'Bad Request') {
        return new HttpError(message, 400)
    }

    static internalServer(message: string = 'Internal Server Error') {
        return new HttpError(message, 500)
    }

}