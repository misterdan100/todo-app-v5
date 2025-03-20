'use client'

import { addUser, removeSession, switchLoading } from "@/store/auth/sessionSlice"
import { AppDispatch, RootState } from "@/store/store"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"

import axios from '@/config/axios'
import { UserSession } from "@/interface"

type Res = {
    user: UserSession | null,
    loadingSession: boolean,
    activeSession: boolean
}

export const useSession = (): Res => {
    const dispatch = useDispatch<AppDispatch>()
    const { user, activeSession, loadingSession } = useSelector( (state: RootState ) => state.session)

    const refreshSession = async () => {
        try {
            const { data } = await axios('/auth/session')

            if(data.success) {
                dispatch(addUser(data.data))
            } else {
                dispatch(removeSession())
            }
        } catch (error) {
            console.error("Error fetching session:", error);
            dispatch(removeSession())
            
        } finally {
            dispatch(switchLoading(false))
        }
    }

    useEffect(() => {
        refreshSession()
    }, [])

    return { user, activeSession, loadingSession }
}