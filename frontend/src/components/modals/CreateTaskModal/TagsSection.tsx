import { Badge } from "@/components/ui/badge";
import { capitalizeText } from "@/utils";
import { useEffect, useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { AddTag } from "./AddTag";
import { useTags } from "@/hooks";

type Tag = {
  id: string;
  name: string;
};

type Props = {
  onSelect: (...event: any[]) => void
}

export const TagsSection = ({ onSelect}: Props) => {
  const { data: tagsUser, error, isLoading, mutate } = useTags();
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [availableTags, setAvailableTags] = useState<Tag[]>(tagsUser ? tagsUser.map((item: Tag) => ({id: item.id, name: item.name})) : []);

  useEffect(() => {
    setAvailableTags(tagsUser 
      ? tagsUser
        .map((item: Tag) => ({id: item.id, name: item.name})) 
        .sort((a: Tag,b: Tag) => a.name.localeCompare(b.name))
      : [])
  }, [tagsUser])


  // To filter available Tags
  useEffect(() => {
    const planedSelectedTags = selectedTags
      .map((item) => item.name.toLowerCase().trim())
      .sort((a,b) => a.localeCompare(b));
    setAvailableTags((prev) =>
      prev.filter((item) => {
        if (!planedSelectedTags.includes(item.name.toLowerCase().trim())) {
          return item;
        }
      })
    );
    onSelect(selectedTags)
  }, [selectedTags]);

  const handleDeleteTag = (tag: Tag) => {
    setSelectedTags((prev) =>
      prev
        .filter((item) => item.name.toLowerCase().trim() !== tag.name.toLowerCase().trim()));

    setAvailableTags(prev => [...prev, tag]
                                      .filter( item => !item.id.includes('new-'))
                                      .sort((a, b) => a.name.localeCompare(b.name)))
  };

  return (
    <div className={`pt-1 flex gap-2`}>
      {selectedTags.length !== 0 && (
        <div className="rounded-md border flex flex-wrap gap-1 p-1">
        {/* Tag buttons */}
        {selectedTags.map((tag) => (
          <Badge
            key={tag.id}
            className="border hover:border-gray-300"
            variant="secondary"
          >
            {capitalizeText(tag.name)}
            <IoCloseCircleOutline className="scale-125 ml-1 text-gray-400 hover:text-red-600 cursor-pointer" 
              onClick={() => handleDeleteTag(tag)}
            />
          </Badge>
        ))}
      </div>
      )}

      <AddTag availableTags={availableTags} setSelectedTags={setSelectedTags} />
    </div>
  );
};
