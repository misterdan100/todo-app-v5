/**
 * Creates a new tag with a random color for a specific user
 * 
 * @param {Object} params - The tag creation parameters
 * @param {string} params.name - The name of the tag to create
 * @param {string} params.userId - The ID of the user who owns this tag
 * 
 * @returns {Promise<Tag|null>} The created tag object or null if creation failed
 * 
 * @example
 * // Create a new "work" tag for user with ID "123"
 * const newTag = await createTag({ name: "work", userId: "123" });
 * if (newTag) {
 *   console.log(`Created tag with ID: ${newTag.id}`);
 * }
 * 
 * @throws Will log the error but return null if tag creation fails
 */

import Tag from "../../models/Tag.model"
import { generateRandomReadableColor } from "../../utils/genRandomColor"

type Props = {
    name: string,
    userId: string
}

export const createTag = async ({name, userId}: Props) => {
    try {
        const tag = await Tag.create({
            name,
            userId,
            color: generateRandomReadableColor()
        })

        return tag
        
    } catch (error) {
        console.log('[ERROR_CREATETAG', error.message)
        return null
    }
}