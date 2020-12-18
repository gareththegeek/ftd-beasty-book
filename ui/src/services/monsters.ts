import { getConfig } from '../config'

export const fetchMonsters = async () => {
    const base = getConfig().apiBaseUrl
    const response = await fetch(`${base}/monsters`)
    return await response.json()
}

export const fetchMonster = async (monsterId: string) => {
    const base = getConfig().apiBaseUrl
    const response = await fetch(`${base}/monsters/${monsterId}`)
    return await response.json()
}
