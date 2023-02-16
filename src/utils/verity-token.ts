import { JwksClient } from "jwks-rsa";
import jwt, { JwtHeader, SigningKeyCallback } from "jsonwebtoken";

const { verify } = jwt;

const client = new JwksClient({
    jwksUri: process.env.AUTH_JWKS as string,
});

async function getKey(header: JwtHeader, callback: SigningKeyCallback) {
    const key = await client.getSigningKey(header.kid);
    callback(null, key.getPublicKey());
}

export function verifyToken(token: string): Promise<boolean> {
    return new Promise((resolve, rej) => {
        verify(token, getKey, {}, (err, decoded) => {
            if (err) resolve(false)
            else resolve(true)
        })
    })
}