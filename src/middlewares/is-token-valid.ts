import { Request } from "express"
import { verifyToken } from "utils/verity-token"

export async function isTokenVerified(request: Request): Promise<boolean> {
    if (!request.headers?.authorization) return false
    const token = (request.headers.authorization || '').split(' ')[1]
    if (!token) return false
    return await verifyToken(token)
}
