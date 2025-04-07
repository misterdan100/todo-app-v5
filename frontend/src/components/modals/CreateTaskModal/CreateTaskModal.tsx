"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { mutate } from "swr";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";

import { AppDispatch, RootState } from "@/store/store";
import { switchModal } from "@/store/ui/modalSlice";
import { TagsSection } from "./TagsSection";
import { SelectProject } from "./SelectProject";
import { createTask, updateTask } from "@/api";


// Shadcn components...........................
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "../../ui/textarea";
import { Toggle } from "@/components/ui/toggle";
import { IoFlag, IoReload, IoStarSharp } from "react-icons/io5";
import { Priority, Status, Task } from "@/interface";
import { switchIsEditing } from "@/store/tasks/tasksSlice";
import { delay } from "@/utils";




const formSchema = z.object({
  name: z
    .string()
    .min(2, { message: "Title must be at least 2 characters." })
    .max(50, { message: "Title must be less than 50 characters." }),
  favorite: z.boolean().default(false),
  description: z.string().optional(),
  priority: z.string().optional(),
  dueDate: z.date().optional(),
  project: z.object({id: z.string(), name: z.string()}).optional(),
  status: z.enum(["completed", "pending", "overdue"]),
  tags: z.array(z.object({id: z.string(), name: z.string()})),
});

const initialValues = {
  name: "",
  favorite: false,
  description: '',
  priority: '',
  dueDate: undefined,
  project: undefined,
  status: "pending" as Status,
  tags: [],
}

// function componente .......................................
export function CreateTaskModal() {
  const router = useRouter();

  // Redux Toolkit states
  const isEditing = useSelector((state: RootState) => state.tasks.isEditing);
  const editTask = useSelector((state: RootState) => state.tasks.editTask);

  const isOpen = useSelector((state: RootState) => state.modal.isOpen);
  const keyCache = useSelector((state: RootState) => state.tasks.keyCache);
  const dispatch = useDispatch<AppDispatch>();

  const [loadingSending, setLoadingSending] = useState(false)

  // Reack-hook-form initial state
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });

  const isFavorite = form.watch("favorite");

  useEffect(() => {
    if(isEditing) {
      form.reset({
        ...editTask,
        dueDate: new Date(editTask?.dueDate ?? ''),
        project: editTask?.project ? {id: editTask.project.id, name: editTask.project.name} : undefined
      })
      return
    }
  }, [isEditing]);

  const handleCreateTask = async (formData: z.infer<typeof formSchema>) => {
    setLoadingSending(true)

    try {
      const res = await createTask(formData)
      if(res.success) {
        form.reset(initialValues);
        mutate(keyCache)
        mutate('/tasks')
        mutate('/projects')
        dispatch(switchModal(false))
        toast.success(res.message, {
          description: res.data.name
        })
        router.refresh()
      }
    } catch (error) {
      toast.error("Error creating task:");
      console.error("Error creating task:", error);
    } finally {
      setLoadingSending(false)
    }
  }

  const handleEditTask = async (formEditData: z.infer<typeof formSchema>) => {
    setLoadingSending(true)
    try {

      const dataToSend = {...formEditData,
        id: editTask?.id!,
        priority: formEditData.priority as Priority
       }

      const res = await updateTask(dataToSend)

      if(!res) {
        toast.error('Error updating task')
        return
      }

      toast.success('Task updated.', {
        description: editTask?.name
      })
      form.reset(initialValues);
      mutate(`/tasks/${editTask?.id}`)
      mutate('/tasks')
      mutate('/projects')
      mutate(keyCache)
      dispatch(switchModal(false))
      router.refresh()

      
    } catch (error) {
      toast.error("Error editing task:");
      console.error("Error editing task:", error);
    } finally {
      setLoadingSending(false)
    }
  }

  const onSubmit = async (formData: z.infer<typeof formSchema>) => {
    if(isEditing) {
      return handleEditTask(formData)
    } else {
      return handleCreateTask(formData)
    }
  };

  const handleCloseOpenModal = async (open: boolean) => {
    if(open === false) {
      form.reset(initialValues);

      //! Force React Hook Form to recognize the change in dueDate
      setTimeout(() => {
        form.setValue("dueDate", undefined);
      }, 0);


      dispatch(switchIsEditing())
    }
    dispatch(switchModal(open));
  }

  return (
    <Dialog
      onOpenChange={(open) => handleCloseOpenModal(open)}
      open={isOpen}
    >
      <DialogTrigger asChild>
        <Button
          className="hover:bg-violet-500 bg-violet-600 text-white"
          variant="secondary"
        >
          Add a new Task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">New Task</DialogTitle>
          <DialogDescription />
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex w-full justify-between items-end gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Task title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Toggle
                variant="outline"
                aria-label="Toggle italic"
                onClick={() =>
                  form.setValue("favorite", !form.getValues().favorite)
                }
              >
                <IoStarSharp
                  className={clsx(isFavorite && "text-yellow-500")}
                />
              </Toggle>
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Info about the task..."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid w-full grid-cols-2">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Status</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="completed" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Completed
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="pending" />
                          </FormControl>
                          <FormLabel className="font-normal">Pending</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="overdue" />
                          </FormControl>
                          <FormLabel className="font-normal">Overdue</FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="priority"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Priority</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select one" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem
                          value="low"
                          className="flex w-full flex-row"
                        >
                          <div className="flex items-center gap-2">
                            <IoFlag className="text-yellow-300" />
                            <span>Low</span>
                          </div>
                        </SelectItem>

                        <SelectItem
                          value="medium"
                          className="flex w-full flex-row"
                        >
                          <div className="flex items-center gap-2">
                            <IoFlag className="text-amber-600" />
                            <span>Medium</span>
                          </div>
                        </SelectItem>

                        <SelectItem
                          value="high"
                          className="flex w-full flex-row"
                        >
                          <div className="flex items-center gap-2">
                            <IoFlag className="text-red-600" />
                            <span>High</span>
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="dueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date due</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[50%] pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value && field.value instanceof Date && !isNaN(field.value.getTime()) ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="w-4 h-4 ml-auto opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) => date < new Date("1990-01-01")}
                        className=""
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="project"
              render={({ field }) => (
                <FormItem className="grid gap-1">
                  <FormLabel>Project</FormLabel>
                  <SelectProject
                    onSelect={field.onChange}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="tags"
              render={({ field }) => (
                <FormItem className="grid">
                  <FormLabel>Tags</FormLabel>
                  <FormControl>
                    <TagsSection 
                      onSelect={field.onChange} 
                    />
                  </FormControl>
                  {/* <FormMessage /> */}
                </FormItem>
              )}
            />

            <Button 
              className={cn(
                'bg-green-600 hover:bg-green-500 w-full',
                isEditing === true && 'bg-amber-600 hover:bg-amber-500 w-full',
                form.formState.errors.name && 'disable opacity-50 hover:bg-green-600 cursor-default'

              )} 
              type="submit"
              style={{
                marginTop: '24px'
              }}
            >
              { loadingSending && <IoReload className="animate-spin"/>}
              {isEditing ? 'Edit Task' : 'Create Task'}
            </Button>

          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
