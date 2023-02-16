import { faker } from '@faker-js/faker/locale/en_IND'
import { OpenIdConnectUser, User } from 'models/user';

export function generateFakeUser(): OpenIdConnectUser {
    const email = faker.internet.email()
    const user = {
        given_name: faker.name.firstName(),
        family_name: faker.name.lastName(),
        email,
    }
    return user;
}
