import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react'

interface User {
  id: number
  username: string
  // Add more properties as needed
}

interface UserContextType {
  user: User[] | null | undefined
  loginUser: (userData: User[]) => void
  logoutUser: () => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error('useUser must be used within a UserProvider')
  }
  return context
}

interface UserProviderProps {
  children: ReactNode  // Specify that children can be any valid React node
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User[] | null | undefined>(undefined)

  const loginUser = (userData: User[]) => {
    setUser(userData)
    localStorage.setItem("user", JSON.stringify(userData))
  }

  const logoutUser = () => {
    setUser(null)
    localStorage.removeItem("user")
  }

  const value: UserContextType = {
    user,
    loginUser,
    logoutUser,
  }

  useEffect(() => {
    const data = localStorage.getItem("user")
    if (data) {
      loginUser(JSON.parse(data))
    }
    else {
      logoutUser()
    }
  }, [])

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
