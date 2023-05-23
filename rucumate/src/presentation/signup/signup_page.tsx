import React, { useState } from 'react';

import Box from '@mui/material/Box';

import Logo from '../../assets/images/logo.svg';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import LogoComponent from '../shared/components/form/logo';
import InputComponent from '../shared/components/form/input';
import ButtonComponent from '../shared/components/form/button';
import AccountComponent from '../shared/components/form/account';

import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

export const SignupComponent: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

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
                        title="Cadastrar"
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
        </>
    );
}