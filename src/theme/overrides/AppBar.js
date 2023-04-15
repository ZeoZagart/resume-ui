export default function AppBar(theme) {
    return {
        MuiAppBar: {
            styleOverrides: {
                root: {
                    color: theme.palette.primary.main,
                    backgroundColor: 'transparent',
                    border: `2px solid ${theme.palette.primary.main}`,
                    borderRadius: '1000px',
                },
            },
        },
    }
}
