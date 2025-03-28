"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useProjects } from "@/hooks";
import { capitalizeText } from "@/utils";
import { useCommandState } from "cmdk";
import { IoAddCircleOutline } from "react-icons/io5";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

type Project = {
  id: string;
  name: string;
};

type Props = {
    onSelect: (...event: any[]) => void
}

export function SelectProject({onSelect: onSelect2}: Props) {
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState("");
  const [availableProjects, setAvailableProjects] = useState<Project[]>([]);

  const editTask = useSelector( (state: RootState) => state.tasks.editTask)

  const { data } = useProjects();


  useEffect(() => {
    if (data) {
      setAvailableProjects(data);
    }

    if(editTask) {
      setValue(editTask.project.name)
    }
  }, [data, editTask]);


  const onCreate = (value: string) => {
    const newProject = {
      id: `new-${Date.now()}`,
      name: value.toLowerCase().trim(),
    };
    onSelect2(newProject)

    const cleanedAvailableProjects = availableProjects.filter( item => !item.id.includes('new-'))

    setAvailableProjects([...cleanedAvailableProjects, newProject]
                            .sort((a, b) => a.name.localeCompare(b.name))
    );
    setValue(value.toLowerCase().trim());
    setOpen(false);
  };


  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>

        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[50%] justify-between"
        >
          {value
            ? capitalizeText(
                availableProjects?.find((project) => project.name === value)
                  ?.name ?? ""
              )
            : "Select project..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>

      </PopoverTrigger>

      <PopoverContent className="w-[100%] p-0">
        <Command>
          <CommandInput placeholder="Search project..." className="h-9" />
          <CommandList>
            <CommandEmpty>
              <EmptySearch onCreate={onCreate} />
            </CommandEmpty>
            <CommandGroup>
              {availableProjects &&
                availableProjects.map((project) => (
                  <CommandItem
                    key={project.id}
                    value={project.name}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                      onSelect2(project)
                    }}
                  >
                    {capitalizeText(project.name)}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === project.name ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const EmptySearch = ({ onCreate }: { onCreate: (value: string) => void }) => {
  const search = useCommandState((state) => state.search);

  return (
    <div
      className="px-4 flex items-center gap-2 cursor-pointer hover:text-primary transition-colors"
      onClick={() => onCreate(search)}
    >
      <IoAddCircleOutline size={18} />
      <span className="text-sm">Create "{capitalizeText(search)}" project</span>
    </div>
  );
};
