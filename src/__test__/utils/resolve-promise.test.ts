import { resolvePromise } from 'utils/resolve-promise'

describe('resolve promise function', () => {
    test('promise resolves with data', async () => {
        const resolves = Promise.resolve(200)
        const [data, error] = await resolvePromise(resolves)
        expect(data).toBe(200)
        expect(error).toBe(null)
    })

    test('promise with error', async () => {
        const resolves = Promise.reject('error')
        const [data, error] = await resolvePromise(resolves)
        expect(error).toBe('error')
        expect(data).toBe(null)
    })
})