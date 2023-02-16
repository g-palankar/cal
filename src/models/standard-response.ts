export interface StandardResponse<T = any> {
    message?: string,
    data?: T,
    code?: string | number,
}