export async function resolvePromise<T, Q>(promise: Promise<T>): Promise<[T | null, Q | null]> {
    try {
        const data = await promise
        return [data, null]
    } catch (error) {
        return [null, error as Q]
    }
}