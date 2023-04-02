import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import NavBar from './components/NavBar'
import HeroSection from './components/HeroSection'
import SignUp from './pages/SignUp'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import { CssBaseline } from '@mui/material'

const App: React.FC = () => {
    return (
        <>
            <CssBaseline />
            <Router>
                <NavBar />
                <Routes>
                    <Route path="/" element={<HeroSection />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/dashboard" element={<Dashboard />} />
                </Routes>
            </Router>
        </>
    )
}

export default App
