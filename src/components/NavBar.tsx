import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Avatar,
    Menu,
    MenuItem,
} from '@mui/material'
import { useAuth } from '../context/AuthContext'
import { Link } from 'react-router-dom'
import { useState } from 'react'

const NavBar: React.FC = () => {
    const { isLoggedIn, setToken } = useAuth()
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

    const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget)
    }

    const handleClose = () => {
        setAnchorEl(null)
    }

    const logOutButtons = () => {
        return (
            <>
                <IconButton
                    edge="end"
                    color="secondary"
                    aria-label="account of current user"
                    aria-haspopup="true"
                    onClick={handleMenu}
                >
                    <Avatar>
                        {"A"}
                    </Avatar>
                </IconButton>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose} component={Link} to="/account-settings">
                        Account Settings
                    </MenuItem>
                    <MenuItem onClick={handleClose} component={Link} to="/subscription">
                        Subscription
                    </MenuItem>
                    <MenuItem onClick={() => setToken(null)}>Logout</MenuItem>
                </Menu>
            </>
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
