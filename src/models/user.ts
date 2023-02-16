export interface User {
    id: string,
    loginId: string,
    given_name: string,
    family_name: string,
    email: string,
}

export type OpenIdConnectUser = Omit<User, 'id' | 'loginId'>