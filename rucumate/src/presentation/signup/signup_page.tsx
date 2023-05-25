import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Logo from '../../assets/images/logo.svg';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import LogoComponent from '../shared/components/form/logo';
import InputComponent from '../shared/components/form/input';
import ButtonComponent from '../shared/components/form/button';
import AccountComponent from '../shared/components/form/account';
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { Info, Visibility, VisibilityOff } from '@mui/icons-material';

export const SignupComponent: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        setSnackbarOpen(false);
    };

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        setSnackbarOpen(false);
    };

    const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
        setSnackbarOpen(false);
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        setSnackbarOpen(false);
    };

    const handleSignup = () => {
        if (username.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
            setSnackbarOpen(true);
        } else {
            // Fazer a lógica de autenticação aqui
            window.location.href = "/login";
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <BoxComponent>
                {
                    <LogoComponent
                        logo={Logo}
                    />
                }
                {
                    <TitleComponent
                        title="Cadastro"
                    />
                }
                {
                    <InputComponent
                        title="Usuário"
                        value={username}
                        onChange={handleUsernameChange}
                    />
                }
                {
                    <InputComponent
                        title="E-mail"
                        value={email}
                        onChange={handleEmailChange}
                    />
                }
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
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
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
                        />
                    }
                </Box>
                {
                    <ButtonComponent
                        title="Cadastrar"
                        onClick={handleSignup}
                    />
                }
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
                    {
                        <AccountComponent
                            title="Já possui uma conta cadastrada?"
                            title_link="Login"
                            href="/login"
                        />
                    }
                </Box>
            </BoxComponent>
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={4000}
                onClose={handleCloseSnackbar}
            >
                <SnackbarContent
                    sx={{
                        backgroundColor: "#100F10",
                        alignItems: 'center',
                    }}
                    message={
                        <Box
                            display="flex"
                            alignItems="center"
                        >
                            <Info sx={{ marginRight: "8px" }} />
                            <span>Preencha todos os campos.</span>
                        </Box>
                    }
                />
            </Snackbar>
        </>
    );
}