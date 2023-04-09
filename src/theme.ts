import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        primary: {
            main: '#1E3A6D',
        },
        secondary: {
            main: '#4D92CA',
        },
        background: {
            default: '#FFFFFF',
            paper: '#F0F1F5',
        },
        text: {
            primary: '#3D3D3D',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
    },
})

export default theme
