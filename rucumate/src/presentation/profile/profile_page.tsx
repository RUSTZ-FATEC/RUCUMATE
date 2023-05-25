import React, { useState } from 'react';
import NavComponent from '../shared/components/nav/nav';

import Logo from '../../assets/images/logo.svg';
import MoistureIcon from '../../assets/images/icons/moisture.svg';
import TemperatureIcon from '../../assets/images/icons/temperature.svg';
import NotificationIcon from '../../assets/images/icons/notification.svg';
import ProfileIcon from '../../assets/images/icons/profile.svg';
import LogoutIcon from '../../assets/images/icons/logout.svg';

import Box from '@mui/material/Box';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import InputComponent from '../shared/components/form/input';
import ButtonComponent from '../shared/components/form/button';
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import { Info, Visibility, VisibilityOff } from '@mui/icons-material';

export const ProfileComponent: React.FC = () => {

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

    const handleUpdateProfile = () => {
        if (username.trim() === "" || email.trim() === "" || password.trim() === "" || confirmPassword.trim() === "") {
            setSnackbarOpen(true);
        } else {
            // Fazer a lógica de autenticação aqui
            window.location.href = "";
        }
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    return (
        <>
            <NavComponent
                logo={Logo}
                navicon1='/umidade'
                icon1={MoistureIcon}
                navicon2='/temperatura'
                icon2={TemperatureIcon}
                navicon3='/notificacao'
                icon3={NotificationIcon}
                navicon4='/perfil'
                icon4={ProfileIcon}
                logout={LogoutIcon}
            />
            <BoxComponent>
                {
                    <TitleComponent
                        title="Meu Perfil"
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
                        title="Atualizar"
                        onClick={handleUpdateProfile}
                    />
                }
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