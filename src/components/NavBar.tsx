import { AppBar, Toolbar, Typography, Button } from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'

const NavBar: React.FC = () => {
    const { isLoggedIn, setToken } = useAuth()

    const logOutButtons = () => {
        return (
            <Button color="inherit" onClick={() => setToken(null)}>
                Logout
            </Button>
        )
    }

    const logInButtons = () => {
        return (
            <div>
                <Button color="inherit" component={Link} to="/signup">
                    Sign Up
                </Button>
                <Button color="inherit" component={Link} to="/login">
                    Log In
                </Button>
            </div>
        )
    }

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    Resume Service
                </Typography>
                {isLoggedIn() ? logOutButtons() : logInButtons()}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar
