/**
 * Server action that revalidates the data cache for the entire application or a specific path.
 * 
 * This function invalidates both the page and layout cache for the specified path and all its nested routes,
 * forcing Next.js to regenerate data and re-render affected components on the next request.
 * 
 * @param {Object} options - Configuration options
 * @param {string} [options.path='/'] - The path to revalidate (defaults to root which revalidates the entire app)
 * 
 * @example
 * // Revalidate the entire application
 * await revalidateAllData({})
 * 
 * @example
 * // Revalidate a specific section of the application
 * await revalidateAllData({ path: '/dashboard' })
 * 
 * @returns {Promise<void>}
 */

'use server'

import { revalidatePath } from "next/cache"

type Props = {
    path?: string
}

export async function revalidateAllData({ path = '/'}: Props) {
    revalidatePath(path, 'layout')
}