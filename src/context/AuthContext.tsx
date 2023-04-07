import React, { createContext, useContext, useState } from 'react'
import { isExpired } from 'react-jwt'

interface AuthContextData {
    isLoggedIn: () => boolean
    token: string | null
    setToken: (value: string | null) => void
}

const AuthContext = createContext<AuthContextData>({
    isLoggedIn: () => false,
    token: null,
    setToken: (value: string | null) => {},
})

export const useAuth = () => useContext(AuthContext)

interface AuthProviderProps {
    children: React.ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, updateTokenState] = useState<string | null>(
        localStorage.getItem('token')
    )
    const isLoggedIn = () => !isTokenExpired(token)

    function setToken(value: string | null) {
        console.log(`updating token to: ${value}`)
        updateTokenState(value)
        if (!isTokenExpired(value)) {
            console.log(`unexpired token, means logged in`)
            localStorage.setItem('token', value!!)
        } else {
            console.log(`expired or null token, means logged out`)
            localStorage.removeItem('token')
        }
    }

    return (
        <AuthContext.Provider value={{ isLoggedIn, token, setToken }}>
            {children}
        </AuthContext.Provider>
    )
}

const isTokenExpired = (token: string | null): boolean => {
    if (!token || token === '') {
        return true
    }

    return isExpired(token)
}
