"use client"

import { useState } from "react"
// import { useRole } from "@/contexts/role-context"

export function useAuthModal() {
  const [isOpen, setIsOpen] = useState(false)
  const [action, setAction] = useState("")
  const [redirectTo, setRedirectTo] = useState("")
  // const { user } = useRole()

  // const requireAuth = (actionDescription: string, redirect?: string) => {
  //   if (!user) {
  //     setAction(actionDescription)
  //     setRedirectTo(redirect || "")
  //     setIsOpen(true)
  //     return false
  //   }
  //   return true
  // }

  const closeModal = () => {
    setIsOpen(false)
    setAction("")
    setRedirectTo("")
  }

  return {
    isOpen,
    action,
    redirectTo,
    // requireAuth,
    closeModal,
    // isAuthenticated: !!user,
  }
}
