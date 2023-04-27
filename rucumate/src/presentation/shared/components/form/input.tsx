import TextField from '@mui/material/TextField';

import { ThemeProvider, createTheme } from '@mui/material/styles';

function InputComponent(props: any) {

    const theme = createTheme({
        palette: {
            primary: {
                main: '#388E3C'
            }
        },
    });

    return (
        <ThemeProvider theme={theme}>
            <TextField
                fullWidth
                label={props.title}
                id="fullWidth"
                variant="standard"
                sx={{
                    mt: 1,
                    '& label': {
                        color: "#FFFFFF"
                    },
                    '& input': {
                        color: "#FFFFFF",
                        borderBottom: "1px solid #FFFFFF"
                    },
                }}
            />
        </ThemeProvider>
    );
}

export default InputComponent;