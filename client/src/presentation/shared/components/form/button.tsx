import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import InputComponent from './input';
import Box from '@mui/material/Box';
import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

function ButtonComponent(props: any) {
    const theme = createTheme({
        palette: {
            primary: {
                main: '#00960A'
            },
        },
    });

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    };


    const handleClick = () => {
        if (props.title === "Cadastrar") {

            const url = "http://localhost:3002/user/register";

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

            fetch(url, config);

        } else if (props.title === "Entrar") {
            const url = "http://localhost:3002/user/login";

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

            fetch(url, config).then((response) => response.json()).then((data) => {
                
                if (data.message == "Authentication successful") {
                
                    window.localStorage.setItem("user_id", data.user.id)
                    window.location.href = "/temperatura";
                    
                }
            });
            
        } else if (props.title === "Atualizar") {
        
            const url = "http://localhost:3002/user/update";

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
            
        }
    };


    if (props.title === "Entrar") {

        return (
            <>
                <ThemeProvider theme={theme}>
                    <InputComponent
                        title="Email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <InputComponent
                        title="Senha"
                        type={showPassword ? "text" : "password"}
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    onClick={() => setShowPassword(!showPassword)}
                                    sx={{ color: "#FFFFFF" }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                        value={password}
                        onChange={handlePasswordChange}
                    />

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
                        onClick={handleClick}
                    >
                        {props.title}
                    </Button>
                </ThemeProvider>
            </>
        );
    } else if (props.title === "Cadastrar") {

        return (
            <>
                <ThemeProvider theme={theme}>
                    <InputComponent
                        title="Usuario"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <InputComponent
                        title="Email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
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
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ color: "#FFFFFF" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                                value={password}
                                onChange={handlePasswordChange}
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
                                            onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                                            sx={{ color: "#FFFFFF" }}
                                        >
                                            {confirmShowPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                        }
                    </Box>

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
                        onClick={handleClick}
                    >
                        {props.title}
                    </Button>
                </ThemeProvider>
            </>
        );
    } else if (props.title === "Atualizar") {
        
        return (
            <>
                <ThemeProvider theme={theme}>
                    <InputComponent
                        title="Usuario"
                        type="text"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                    <InputComponent
                        title="Email"
                        type="text"
                        value={email}
                        onChange={handleEmailChange}
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
                                            onClick={() => setShowPassword(!showPassword)}
                                            sx={{ color: "#FFFFFF" }}
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                                value={password}
                                onChange={handlePasswordChange}
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
                                            onClick={() => setConfirmShowPassword(!confirmShowPassword)}
                                            sx={{ color: "#FFFFFF" }}
                                        >
                                            {confirmShowPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                        }
                    </Box>

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
                        onClick={handleClick}
                    >
                        {props.title}
                    </Button>
                </ThemeProvider>
            </>
        );
    }
}

export default ButtonComponent;
