"use client";

import { AppDispatch, RootState } from "@/store/store";
import { capitalizeText, getAvatarLetters } from "@/utils";
import { useDispatch, useSelector } from "react-redux";

import { Button } from "@/components/ui/button";
import { IoColorWand, IoLogOut } from "react-icons/io5";
import { logoutUser } from "@/api/auth/logoutUser";
import { verifySession } from "@/store/auth/sessionSlice";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { uiConfig } from "@/config/uiConfig";
import { DeleteProfileModal, EditProfileModal } from "@/components";
import Link from "next/link";
import { revalidateAllData } from "@/actions";

export const ProfileData = ({bgColor}: {bgColor: string}) => {
  const router = useRouter()
  const user = useSelector((state: RootState) => state.session.user);
  const dispatch = useDispatch<AppDispatch>();

  const letterAvatar = getAvatarLetters(user?.name || '')
  
  const handleLogout = async () => {

    const res = await logoutUser()

    if(res.success === true) {
      toast.success('Logout successfully')
      localStorage.removeItem('token')
      await dispatch(verifySession())
      await revalidateAllData({})
      window.location.hash = '/login'
      return
    }
    toast.error('Error logging out')

  }

  return (
    <>
      <div className="h-56 w-96 absolute flex justify-center items-center ">

        {/* Avatar circle */}
        <div
          className="object-cover h-20 w-20 rounded-full bg-white text-gray-700 dark:bg-slate-800 dark:text-gray-300 flex justify-center items-center"
          style={{
            border: `4px solid ${uiConfig.mainColor}`
          }}
        >
          <p
            className="text-4xl font-bold "
          >{letterAvatar}</p>
        </div>
      </div>

      <div
        className=" h-56 mx-4 md:w-96 rounded-3xl shadow-md sm:w-80 sm:mx-0 "
        style={{
          backgroundColor: bgColor,
        }}
      >
        <div className="h-1/2 w-full flex justify-between items-baseline px-3 py-5">
          <h1 className="text-white font-semibold text-lg">PROFILE</h1>
        </div>

        <div className=" bg-white h-fit w-full pb-4 rounded-3xl flex flex-col justify-around items-center dark:bg-slate-900">
          <div className="w-full h-1/2 flex justify-between items-center px-3 pt-2">
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-gray-500 dark:text-gray-500 text-xs">Completed</h1>
              <h1 className="text-gray-600 dark:text-gray-400 text-sm">340</h1>
            </div>
            <div className="flex flex-col justify-center items-center">
              <h1 className="text-gray-500 dark:text-gray-500 text-xs">Pending</h1>
              <h1 className="text-gray-600 dark:text-gray-400 text-sm">1356</h1>
            </div>
          </div>
          <div className="w-full h-1/2 flex flex-col justify-center items-center">
            <h1 className="text-gray-700 dark:text-gray-200 font-bold text-xl">
              {capitalizeText(user?.name || "")}
            </h1>
            <h1 className="text-gray-500 dark:text-gray-400 text-sm">{user?.email}</h1>
          </div>

          <div className="w-full flex justify-center items-center mt-12 gap-4 px-4">

            {user && <EditProfileModal 
              currentName={user.name}
              currentEmail={user.email}
            />}

            <Button variant="outline" className="w-full dark:bg-slate-800 dark:hover:bg-slate-700 "
                onClick={handleLogout}
            >
              <IoLogOut className="text-gray-800 dark:text-gray-200 w-8 h-8 scale-125" />
              Logout
            </Button>
          </div>

          <div className="w-full grid grid-cols-2 justify-center items-center pt-4 mt-4 gap-4 px-4 border-t-2 border-gray-200 ">
            <Link href='/seed' >

              <Button variant='outline' className="w-full dark:bg-slate-800 dark:hover:bg-slate-700">
                <IoColorWand className="text-gray-800   dark:text-gray-200 w-8 h-8 scale-125"/>
                Seed Data</Button>
            </Link>
            <DeleteProfileModal />
          </div>
        </div>
      </div>
    </>
  );
};
