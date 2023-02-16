import { Handler, Request, Response } from "express";
import { HttpError } from "../models/errors/htttp-error";

export function httpErrorHandler(
    err: HttpError,
    req: Request,
    res: Response,
    next: Handler,
) {
    res.status(err.status || 500).json({
        message: err.message,
        status: err.status || 500,
        errors: err.errorData
    })
}