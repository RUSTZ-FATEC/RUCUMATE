import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

function InputComponent(props: any) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#00960A'
            }
        },
    });

    return (
        <>
            <ThemeProvider theme={theme}>
                <TextField
                    fullWidth
                    label={props.title}
                    type={props.type}
                    InputProps={props.InputProps}
                    value={props.value}
                    onChange={props.onChange}
                    error={props.error}
                    helperText={props.helperText}
                    id="fullWidth"
                    variant="standard"
                    sx={{
                        mt: 1,
                        '& label': {
                            color: "#FFFFFF"
                        },
                        '& input': {
                            color: "#FFFFFF"
                        },
                        '& .MuiInput-underline:before': {
                            borderBottom: "1px solid #FFFFFF"
                        },
                        '& .MuiInput-underline:hover:before': {
                            borderBottom: "1px solid #FFFFFF"
                        },
                        '& .MuiInput-underline:after': {
                            borderBottom: "2px solid primary"
                        }
                    }}
                />
            </ThemeProvider>
        </>
    );
}

export default InputComponent;