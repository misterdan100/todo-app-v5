"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { IoCreate, IoSync } from "react-icons/io5";
import { InputErrorMessage } from "../errors/InputErrorMessage";
import { updateProfile } from "@/api";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";
import { useRouter } from "next/navigation";
import { verifySession } from "@/store/auth/sessionSlice";

type Props = {
  currentName: string;
  currentEmail: string;
};

type FormData = {
  name: string;
  email: string;
};

export function EditProfileModal({ currentName, currentEmail }: Props) {
    const router = useRouter()

    const user = useSelector((state: RootState) => state.session.user);
    const dispatch = useDispatch<AppDispatch>();
    const [loadingUpdate, setLoadingUpdate] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)


  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: user?.name,
      email: user?.email,
    },
  });

  const handleEditProfile = async (formData: FormData) => {
    setLoadingUpdate(true)
    const res = await updateProfile(formData)
    
    if(!res) {
        toast.error('Error updating profile')
        setLoadingUpdate(false)
        return
    }
    dispatch(verifySession())
    toast.success('Profile updated')
    setLoadingUpdate(false)
    setIsOpenModal(false)
  };

  return (
    <Dialog 
        open={isOpenModal} 
        onOpenChange={(open) => {
            if(!open) reset()
            setIsOpenModal(open)
        }}
    >
      <DialogTrigger asChild>
        <Button 
            className="bg-yellow-500 hover:bg-yellow-400 dark:bg-yellow-600 dark:hover:bg-yellow-500 w-full"
        >
          <IoCreate className="text-white w-8 h-8 scale-125" />
          Edit Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            {"Make changes to your profile here. Click save when you&apos;re done."}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleEditProfile)}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                className="col-span-3"
                {...register("name", {
                  minLength: {
                    value: 3,
                    message: "At least 3 characters for name",
                  },
                })}
              />
              {errors.name && (
                <div className="col-span-3 col-start-2">
                  <InputErrorMessage>{errors.name.message}</InputErrorMessage>
                </div>
              )}
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                E-mail
              </Label>
              <Input
                id="email"
                className="col-span-3"
                {...register("email", {
                  validate: (value) => {
                    if (
                      value &&
                      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)
                    ) {
                      return "Invalid email address";
                    }
                    return true;
                  },
                })}
              />
              {errors.email && (
                <div className="col-span-3 col-start-2">
                  <InputErrorMessage>{errors.email.message}</InputErrorMessage>
                </div>
              )}
            </div>
          </div>

          <DialogFooter>
            <Button 
                type="submit" 
                disabled={loadingUpdate}
                className="transition-all"
            >
                { loadingUpdate && <IoSync className="animate-spin block " size={36}/> }
                
                Save changes
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
