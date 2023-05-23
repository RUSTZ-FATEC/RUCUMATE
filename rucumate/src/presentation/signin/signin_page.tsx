import React, { useState } from 'react';

import Box from '@mui/material/Box';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import LogoComponent from '../shared/components/form/logo';
import InputComponent from '../shared/components/form/input';
import ButtonComponent from '../shared/components/form/button';
import AccountComponent from '../shared/components/form/account';

import { IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from '@mui/icons-material';

import Logo from '../../assets/images/logo.svg';

export const SigninComponent: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);

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
                        title="Login"
                    />
                }
                {
                    <InputComponent
                        title="Usuário"
                    />
                }
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
                {
                    <ButtonComponent
                        title="Entrar"
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
                            title="Não possui uma conta de acesso?"
                            title_link="Cadastrar"
                            href="/cadastro"
                        />
                    }
                </Box>
            </BoxComponent>
        </>
    );
}