import React, { useState } from 'react';
import Box from '@mui/material/Box';
import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import LogoComponent from '../shared/components/form/logo';
import InputComponent from '../shared/components/form/input';
import ButtonComponent from '../shared/components/form/button';
import AccountComponent from '../shared/components/form/account';
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { Info, Visibility, VisibilityOff } from '@mui/icons-material';
import Logo from '../../assets/images/logo.svg';

export const SigninComponent: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [usernameError, setUsernameError] = useState(false);
    const [passwordError, setPasswordError] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        setSnackbarOpen(false);
        setUsernameError(false);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setSnackbarOpen(false);
        setPasswordError(false);
    };

    const handleSignin = () => {
        if (username.trim() === "" || password.trim() === "") {
            setSnackbarOpen(true);
            setUsernameError(username.trim() === "");
            setPasswordError(password.trim() === "");
        } else {
            // Fazer a lógica de autenticação aqui
            window.location.href = "/umidade";
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <BoxComponent>
                <LogoComponent logo={Logo} />
                <TitleComponent title="Login" />
                <InputComponent
                    title="Usuário"
                    value={username}
                    onChange={handleUsernameChange}
                    error={usernameError}
                />
                <InputComponent
                    title="Senha"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={handlePasswordChange}
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
                    error={passwordError}
                />
                <ButtonComponent title="Entrar" onClick={handleSignin} />
                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: "auto auto",
                        placeItems: "center",
                        mt: "10px",
                        '@media screen and (max-width: 600px)': {
                            display: "grid",
                            gridTemplateColumns: "auto",
                            placeItems: "center",
                            mt: "10px"
                        }
                    }}
                >
                    <AccountComponent
                        title="Não possui uma conta de acesso?"
                        title_link="Cadastrar"
                        href="/cadastro"
                    />
                </Box>
            </BoxComponent>
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
};