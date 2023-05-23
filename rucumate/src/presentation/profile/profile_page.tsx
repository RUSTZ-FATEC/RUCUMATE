import React, { useState } from 'react';
import NavComponent from '../shared/components/home/nav';

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

import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const ProfileComponent: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

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
                    />
                }
                {
                    <InputComponent
                        title="E-mail"
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
                {
                    <ButtonComponent
                        title="Atualizar"
                    />
                }
            </BoxComponent>
        </>
    );
}