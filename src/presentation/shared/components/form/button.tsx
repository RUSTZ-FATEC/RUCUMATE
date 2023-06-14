import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputComponent, { InputComponentProps } from './input';
import Box from '@mui/material/Box';
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { Info, Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

function ButtonComponent(props: InputComponentProps): any {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#00960A'
            },
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [emailError, setEmailError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const [confirmPasswordError, setConfirmPasswordError] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        setSnackbarOpen(false);
        setUsernameError(false);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setSnackbarOpen(false);
        setEmailError(false);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setSnackbarOpen(false);
        setPasswordError(false);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        setSnackbarOpen(false);
        setConfirmPasswordError(false);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleClick = () => {
        if (props.title === "Cadastrar") {

            if (username.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
                setSnackbarOpen(true);
                setUsernameError(username.trim() === "");
                setEmailError(email.trim() === "");
                setPasswordError(password.trim() === "");
                setConfirmPasswordError(confirmPassword.trim() === "");
            } else {
                const url = "https://rucumate.herokuapp.com/user/register";

                const config = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "username": username,
                        "email": email,
                        "passwd": password
                    })
                };
                fetch(url, config)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.message === "Authentication successful") {
                            window.location.href = "/";
                        }
                    });
            }

        } else if (props.title === "Entrar") {
            if (email.trim() === "" || password.trim() === "") {
                setEmailError(email.trim() === "");
                setPasswordError(password.trim() === "");
                setSnackbarOpen(true);
            } else {
                const url = "https://rucumate.herokuapp.com/user/login";

                const config = {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email": email,
                        "passwd": password
                    })
                };

                fetch(url, config)
                    .then((response) => response.json())
                    .then((data) => {
                        if (data.message === "Authentication successful") {
                            window.localStorage.setItem("user_id", data.user.id)
                            window.location.href = "umidade";
                        }
                    });
            }

        } else if (props.title === "Atualizar") {

            window.alert("Manuentção em andamento")

        }
    };


    if (props.title === "Entrar") {

        return (
            <>
                <ThemeProvider theme={theme}>
                    <InputComponent
                        title="Email"
                        type="text"
                        InputProps=''
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                    />
                    <InputComponent
                        title="Senha"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    disableRipple
                                    onClick={() => setShowPassword(!showPassword)}
                                    sx={{ color: "#FFFFFF" }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                        value={password}
                        onChange={handlePasswordChange}
                        error={passwordError}
                    />

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
                        onClick={handleClick}
                    >
                        {props.title}
                    </Button>
                </ThemeProvider>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                >
                    <SnackbarContent
                        sx={{
                            backgroundColor: "#100F10",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        message={
                            <Box
                                display="flex"
                                alignItems="center"
                            >
                                <Info
                                    sx={{
                                        marginRight: "8px"
                                    }}
                                />
                                <span>Preencha todos os campos.</span>
                            </Box>
                        }
                    />
                </Snackbar>
            </>
        );
    } else if (props.title === "Cadastrar") {

        return (
            <>
                <ThemeProvider theme={theme}>
                    <InputComponent
                        title="Usuario"
                        type="text"
                        InputProps=''
                        value={username}
                        onChange={handleUsernameChange}
                        error={usernameError}
                    />
                    <InputComponent
                        title="Email"
                        type="text"
                        InputProps=''
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                    />

                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "auto auto auto",
                        '@media screen and (max-width: 600px)': {
                            display: "grid",
                            gridTemplateColumns: "auto"
                        },
                    }}>
                        {
                            <InputComponent
                                title="Senha"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            disableRipple
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ color: "#FFFFFF" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                                value={password}
                                onChange={handlePasswordChange}
                                error={passwordError}
                            />
                        }
                        <Box sx={{
                            m: "15px",
                            '@media screen and (max-width: 600px)': {
                                m: "0"
                            }
                        }}
                        />
                        {
                            <InputComponent
                                title="Confirmar senha"
                                type={confirmShowPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            disableRipple
                                            onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                                            sx={{ color: "#FFFFFF" }}
                                        >
                                            {confirmShowPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                error={confirmPasswordError}
                            />
                        }
                    </Box>

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
                        onClick={handleClick}
                    >
                        {props.title}
                    </Button>
                </ThemeProvider>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                >
                    <SnackbarContent
                        sx={{
                            backgroundColor: "#100F10",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        message={
                            <Box
                                display="flex"
                                alignItems="center"
                            >
                                <Info
                                    sx={{
                                        marginRight: "8px"
                                    }}
                                />
                                <span>Preencha todos os campos.</span>
                            </Box>
                        }
                    />
                </Snackbar>
            </>
        );
    } else if (props.title === "Atualizar") {

        return (
            <>
                <ThemeProvider theme={theme}>
                    <InputComponent
                        title="Usuario"
                        type="text"
                        InputProps=''
                        value={username}
                        onChange={handleUsernameChange}
                        error={usernameError}
                    />
                    <InputComponent
                        title="Email"
                        type="text"
                        InputProps=''
                        value={email}
                        onChange={handleEmailChange}
                        error={emailError}
                    />

                    <Box sx={{
                        display: "grid",
                        gridTemplateColumns: "auto auto auto",
                        '@media screen and (max-width: 600px)': {
                            display: "grid",
                            gridTemplateColumns: "auto"
                        },
                    }}>
                        {
                            <InputComponent
                                title="Senha"
                                type={showPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            disableRipple
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ color: "#FFFFFF" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                                value={password}
                                onChange={handlePasswordChange}
                                error={passwordError}
                            />
                        }
                        <Box sx={{
                            m: "15px",
                            '@media screen and (max-width: 600px)': {
                                m: "0"
                            }
                        }}
                        />
                        {
                            <InputComponent
                                title="Confirmar senha"
                                type={confirmShowPassword ? "text" : "password"}
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            disableRipple
                                            onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                                            sx={{ color: "#FFFFFF" }}
                                        >
                                            {confirmShowPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                error={confirmPasswordError}
                            />
                        }
                    </Box>

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
                        onClick={handleClick}
                    >
                        {props.title}
                    </Button>
                </ThemeProvider>
                <Snackbar
                    open={snackbarOpen}
                    autoHideDuration={4000}
                    onClose={handleCloseSnackbar}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'center'
                    }}
                >
                    <SnackbarContent
                        sx={{
                            backgroundColor: "#100F10",
                            alignItems: 'center',
                            justifyContent: 'center'
                        }}
                        message={
                            <Box
                                display="flex"
                                alignItems="center"
                            >
                                <Info
                                    sx={{
                                        marginRight: "8px"
                                    }}
                                />
                                <span>Preencha todos os campos.</span>
                            </Box>
                        }
                    />
                </Snackbar>
            </>
        );
    }
}

export default ButtonComponent;
