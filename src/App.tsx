import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/dashboard/Dashboard'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { AuthProvider, useAuth } from './context/AuthContext'
import theme from './theme'

const Home: React.FC = () => {
    const { isLoggedIn } = useAuth()
    return isLoggedIn() ? <Dashboard /> : <HeroSection />
}

const App: React.FC = () => {
    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AuthProvider>
                    <Router>
                        <NavBar />
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/signup" element={<SignUp />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/dashboard" element={<Dashboard />} />
                        </Routes>
                    </Router>
                </AuthProvider>
            </ThemeProvider>
        </>
    )
}

export default App
