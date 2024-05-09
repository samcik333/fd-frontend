import React, { createContext, useContext, useState, ReactNode } from "react"

interface ToastContextType {
  show: boolean
  message: string
  variant: string
  triggerToast: (msg: string, varType?: string) => void
  hideToast: () => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext)
  if (context === undefined) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

interface ToastProviderProps {
  children: ReactNode
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const [show, setShow] = useState<boolean>(false)
  const [message, setMessage] = useState<string>("")
  const [variant, setVariant] = useState<string>("success")

  const triggerToast = (msg: string, varType: string = "success") => {
    setMessage(msg)
    setVariant(varType)
    setShow(true)
  }

  const hideToast = () => setShow(false)

  const value = { show, message, variant, triggerToast, hideToast }

  return (
    <ToastContext.Provider value={value}>{children}</ToastContext.Provider>
  )
}
