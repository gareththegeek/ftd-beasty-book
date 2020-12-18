import { getConfig } from '../config'

export const fetchCategories = async () => {
    const base = getConfig().apiBaseUrl
    const response = await fetch(`${base}/categories`)
    return await response.json()
}
