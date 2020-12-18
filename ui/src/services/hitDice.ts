import { getConfig } from '../config'

export const fetchHitDice = async () => {
    const base = getConfig().apiBaseUrl
    const response = await fetch(`${base}/hitDice`)
    return await response.json()
}
