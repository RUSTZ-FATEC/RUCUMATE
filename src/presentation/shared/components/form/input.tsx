import TextField from '@mui/material/TextField';

import { createTheme, ThemeProvider } from '@mui/material/styles';

export interface InputComponentProps {
    title: string;
    type: string;
    InputProps: any;
    value: string;
    onChange: any;
    error: boolean;
}

function InputComponent(props: InputComponentProps) {
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