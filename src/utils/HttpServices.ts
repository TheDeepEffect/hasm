import { IGET } from '../types'

export const GET = async ({ url, headers }: IGET) => {
    const response = await fetch(url, { headers })
    return response
}
