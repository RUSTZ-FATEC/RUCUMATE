import React, { useState } from 'react';

import ContainerComponent from '../shared/components/container';

import Box from '@mui/material/Box';

import BoxComponent from '../shared/components/form/box';
import LogoComponent from '../shared/components/form/logo';
import Logo from '../../assets/images/logo.svg';
import TitleComponent from '../shared/components/title';
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

    const handleSignup = () => {
        if (username.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
            setSnackbarOpen(true);
            setUsernameError(username.trim() === "");
            setEmailError(email.trim() === "");
            setPasswordError(password.trim() === "");
            setConfirmPasswordError(confirmPassword.trim() === "");
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
            <ContainerComponent>
                <BoxComponent>
                    <LogoComponent
                        logo={Logo}
                    />
                    <TitleComponent
                        title="Cadastro"
                    />
                    <InputComponent
                        title="Usuário"
                        value={username}
                        onChange={handleUsernameChange}
                        error={usernameError}
                    />
                    <InputComponent
                        title="E-mail"
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
                        <InputComponent
                            title="Senha"
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={handlePasswordChange}
                            error={passwordError}
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
                        <Box sx={{
                            m: "15px",
                            '@media screen and (max-width: 600px)': {
                                m: "0"
                            }
                        }}
                        />
                        <InputComponent
                            title="Confirmar senha"
                            type={confirmShowPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            error={confirmPasswordError}
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
                    </Box>
                    <ButtonComponent
                        title="Cadastrar"
                        onClick={handleSignup}
                    />
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
                            title="Já possui uma conta cadastrada?"
                            title_link="Login"
                            href="/login"
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
            </ContainerComponent>
        </>
    );
}