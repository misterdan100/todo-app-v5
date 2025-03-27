"use client"
 
import * as React from "react"
 
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/components/ui/drawer"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { capitalizeText } from "@/utils"
import { IoAddCircleOutline } from "react-icons/io5"
import { useCommandState } from "cmdk"
 
type Status = {
  value: string
  label: string
}

type Tag = {
  id: string
  name: string
}

type Props = {
  availableTags: {id: string, name: string}[]
  setSelectedTags: React.Dispatch<React.SetStateAction<Tag[]>>
}
 
export function AddTag({availableTags, setSelectedTags}: Props) {
  const [open, setOpen] = React.useState(false)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const [selectedStatus, setSelectedStatus] = React.useState<Status | null>(
    null
  )

  

  const handleSelectTag = (tag: Tag) => {
    setSelectedTags(prev => [...prev, tag])
    setOpen(false)

  }
 
  if (isDesktop) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-[150px] justify-start">
            {selectedStatus ? <>{selectedStatus.label}</> : <>+ Add Tags</>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0" align="start">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} 
            handleSelectTag={handleSelectTag}
            availableTags={availableTags}
          />
        </PopoverContent>
      </Popover>
    )
  }
 
  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-[150px] justify-start">
          {selectedStatus ? <>{selectedStatus.label}</> : <>+ Add Tags</>}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <div className="mt-4 border-t">
          <StatusList setOpen={setOpen} setSelectedStatus={setSelectedStatus} 
            handleSelectTag={handleSelectTag}
            availableTags={availableTags}
          />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
 
function StatusList({
  setOpen,
  setSelectedStatus,
  handleSelectTag,
  availableTags
}: {
  setOpen: (open: boolean) => void
  setSelectedStatus: (status: Status | null) => void
  handleSelectTag: (tag: Tag) => void
  availableTags: {id: string, name: string}[]
}) {

    // Function to handle creating a new tag from search
    const handleCreateTag = (value: string) => {
      // Generate a temporary ID - in production you'd call your API
      const newTag = { id: `new-${Date.now()}`, name: value.toLowerCase().trim() };
      
      // Select the new tag
      handleSelectTag(newTag);
      
      // Close the popover
      setOpen(false);
    };

  return (
    <Command>
      <CommandInput placeholder="Filter Tags..." 
      />
      <CommandList>
      <CommandEmpty className="p-0">
          <EmptyStateWithAction onCreate={handleCreateTag} />
        </CommandEmpty>
        <CommandGroup>
          {availableTags.map((status) => (
            <CommandItem
              key={status.id}
              value={status.name}
              onSelect={(value) => handleSelectTag({id: status.id, name: status.name})}
            >
              {capitalizeText(status.name)}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  )
}

function EmptyStateWithAction({ onCreate }: { onCreate: (value: string) => void }) {
  // This hook is used within Command's context
  const search = useCommandState((state) => state.search);
  
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-2">      
      <div 
        className="flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
        onClick={() => onCreate(search.toLowerCase().trim())}
      >
        <IoAddCircleOutline size={18} />
        <span className="text-sm">Create "{search}" tag</span>
      </div>
    </div>
  );
}