import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import { CssBaseline } from '@mui/material'
import { AuthProvider, useAuth } from './context/AuthContext'
import ThemeProvider from './theme'
import Subscription from './pages/Subscription'
import EmailVerification from './pages/EmailVerification'

const Home: React.FC = () => {
    const { isLoggedIn } = useAuth()
    return isLoggedIn() ? <Dashboard /> : <HeroSection />
}

const App: React.FC = () => {
    return (
        <>
            <ThemeProvider>
                <CssBaseline />
                <AuthProvider>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/email-verification" element={<EmailVerification />} />
                            <Route
                                path="/subscription"
                                element={<Subscription />}
                            />
                        </Routes>
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </>
    )
}

export default App
