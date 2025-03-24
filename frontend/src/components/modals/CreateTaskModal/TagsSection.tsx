import { Badge } from "@/components/ui/badge"
import { capitalizeText } from "@/utils"
import { useState } from "react"
import { IoCloseCircleOutline } from "react-icons/io5"
import { AddTag } from "./AddTag"

const existingTags = [
    "household",
    "work",
    "travel",
    "health wellness",
    "events",
    "education",
    "shopping",
    "entertainment",
    "family",
    "hobbies",
  ]

export const TagsSection = () => {
    const [selectedTags, setSelectedTags] = useState(existingTags)

  
  const handleDeleteTag = (tag: string) => {
    setSelectedTags(prev => prev.filter( item => item.toLowerCase() !== tag.toLowerCase()))
  }
  
  return (
    <>
      <div className="rounded-md border flex flex-wrap gap-1 p-1">

        {/* Tag buttons */}
        { selectedTags.map( tag => (
          <Badge 
          key={tag}
          className="border hover:border-gray-300"
          variant='secondary'
          >{capitalizeText(tag)}
              <IoCloseCircleOutline className="scale-125 ml-1 text-gray-400 hover:text-red-600 cursor-pointer"/>
          </Badge>
        ))}


      </div>

      <AddTag />
    </>
  )
}