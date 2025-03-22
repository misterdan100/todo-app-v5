'use client'

import { deleteUser } from "@/api";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger, DialogOverlay
} from "@/components/ui/dialog";
import { verifySession } from "@/store/auth/sessionSlice";
import { AppDispatch } from "@/store/store";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { IoSync, IoTrash } from "react-icons/io5";
import { useDispatch } from "react-redux";
import { toast } from "sonner";

export function DeleteProfileModal() {
    const router = useRouter()
    const dispatch = useDispatch<AppDispatch>();
    const [loading, setLoading] = useState(false)
    const [isOpenModal, setIsOpenModal] = useState(false)


    const handleDelete = async () => {
        setLoading(true)
        const res = await deleteUser()
        
        if(!res) {
            setLoading(false)
            toast.error('Error deleting account')
            return
        }

        toast.success('User deleted successfully')
        setLoading(false)
        dispatch(verifySession())
        router.push('/login')
        setIsOpenModal(false)
    }  

  return (
    <Dialog
        open={isOpenModal} 
        onOpenChange={ (open) => setIsOpenModal(open) }
    >
      <DialogTrigger asChild >
        <Button variant="destructive" className="w-full">
          <IoTrash className="text-white w-8 h-8 scale-125" />
          Delete Account
        </Button>
      </DialogTrigger>

      <DialogOverlay className="bg-white/10 backdrop-blur-sm">
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Delete account ?</DialogTitle>
            <DialogDescription>
              This action will delete all data about this account.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button 
                onClick={handleDelete}
                variant="destructive" 
                type="button"
                disabled={loading}
            >
                { loading ? <IoSync className="animate-spin block " size={36}/> : <IoTrash className="text-white w-8 h-8 scale-125" /> }
              
              Delete Account
            </Button>
          </DialogFooter>
        </DialogContent>
      </DialogOverlay>
    </Dialog>
  );
}
