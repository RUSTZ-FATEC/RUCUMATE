import Button from '@mui/material/Button';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function ButtonComponent(props: any) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#388E3C'
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