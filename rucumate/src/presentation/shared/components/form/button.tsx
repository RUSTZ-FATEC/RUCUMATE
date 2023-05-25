import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function ButtonComponent(props: any) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#00960A'
            },
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <Button
                    fullWidth
                    id="fullWidth"
                    variant="contained"
                    disableElevation={true}
                    disableRipple
                    sx={{
                        mt: 3,
                        backgroundColor: "primary",
                        '&:hover': {
                            backgroundColor: "primary"
                        }
                    }}
                    onClick={props.onClick}
                >{props.title}
                </Button>
            </ThemeProvider>
        </>
    );
}

export default ButtonComponent;