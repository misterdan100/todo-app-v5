// this component set the reducer state theme to <html> tag
'use client'

import { RootState } from "@/store/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export const ThemeManager = () => {
  const theme = useSelector( (state: RootState) => state.theme.theme)

  useEffect(() => {
    // add or remove 'dark' class in <html>
    const root = document.documentElement // select <html> tag
    if( theme === 'dark' ) {
        root.classList.add('dark')
    } else {
        root.classList.remove('dark')
    }

  }, [theme])
  
  return null
}