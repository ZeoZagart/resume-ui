export default function List(theme) {
    return {
        MuiList: {
            styleOverrides: {
                root: {
                    border: `2px solid ${theme.palette.primary.main}`,
                    margin: '2px',
                    borderRadius: '15px',
                    padding: '20px',
                    sx: {
                        height: '48px',
                    },
                },
                sizeLarge: {
                    height: 48,
                },
            },
        },
    }
}
