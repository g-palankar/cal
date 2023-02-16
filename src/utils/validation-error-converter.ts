import { ValidationError } from "yup";
import { ErrorData } from "../models/errors/error-data";

export function convertToHttpErrorData(validationError: ValidationError): ErrorData {
    const errorData = validationError.inner.reduce((errorData, currentValue) => {
        if (currentValue.path) {
            errorData[currentValue.path] = currentValue.errors.map(err => ({ message: err }))
        }
        return errorData
    }, {} as ErrorData)

    return errorData
}