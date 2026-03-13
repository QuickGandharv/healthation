"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

interface User {
    name: string
    email: string
    first_name: string
    last_name: string
    avatar?: string
    role?: string | "patient" | "doctor" | "admin"
}


interface AuthContextType {
    user: User | null
    token: string | null
    login: (token: string, user: User) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const router = useRouter()

    const [user, setUser] = useState<User | null>(null)
    const [token, setToken] = useState<string | null>(null)

    useEffect(() => {
        const storedToken = localStorage.getItem("token")
        const storedUser = localStorage.getItem("user")

        if (storedToken) setToken(storedToken)
        if (storedUser) setUser(JSON.parse(storedUser))
    }, [])

    const login = (token: string, user: User) => {
        localStorage.setItem("token", token)
        localStorage.setItem("user", JSON.stringify(user))

        document.cookie = `token=${token}; path=/`

        setToken(token)
        setUser(user)

        router.push("/dashboard")
    }

    const logout = () => {
        localStorage.removeItem("token")
        localStorage.removeItem("user")

        document.cookie = "token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"

        setToken(null)
        setUser(null)

        router.push("/login")
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout }}>
        {children}
        </AuthContext.Provider>
    )
}

    export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error("useAuth must be used inside AuthProvider")
    }

    return context
}
