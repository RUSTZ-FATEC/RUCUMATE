import TextField from '@mui/material/TextField';

import { createTheme } from '@mui/material/styles';

function InputComponent(props: any) {

    const theme = createTheme({
        palette: {
            primary: {
                main: "#FFFFFF",
            },
        },
    });

    return (
        <TextField
            fullWidth
            label={props.title}
            id="fullWidth"
            variant="standard"
            sx={{
                mt: 1,
                '&::after': {
                    content: "''",
                    borderBottom: "1px solid #FFFFFF"
                }
            }}
            inputProps={{
                style: {
                    color: "#FFFFFF",
                    borderBottom: "1px solid #FFFFFF"
                }
            }}
            InputLabelProps={{
                style: {
                    color: "#FFFFFF"
                }
            }}
        />
    );
}

export default InputComponent;