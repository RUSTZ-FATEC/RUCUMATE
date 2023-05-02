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

export const SinginComponent: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const handleButtonClick = () => {
        if (username.trim() === '') {
            setError(true);
        }
        if (password.trim() === '') {
            setError(true);
        } else {
            setError(false);
            // consumo de api aqui
        }
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
                        title="Login"
                    />
                }
                {
                    <InputComponent
                        title="Usuário"
                        value={username}
                        onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setUsername(event.target.value)}
                        error={error}
                        helperText={error ? 'Este campo é obrigatório' : ''}
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
                        value={password}
                        onChange={(event: { target: { value: React.SetStateAction<string>; }; }) => setPassword(event.target.value)}
                        error={error}
                        helperText={error ? 'Este campo é obrigatório' : ''}
                    />
                }
                {
                    <ButtonComponent
                        title="Entrar"
                        onClick={handleButtonClick}
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