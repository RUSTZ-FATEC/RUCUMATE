import * as React from 'react';

import Box from '@mui/material/Box';

import Logo from '../../assets/images/logo.svg';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import LogoComponent from '../shared/components/form/logo';
import InputComponent from '../shared/components/form/input';
import ButtonComponent from '../shared/components/form/button';

export const SingupComponent: React.FC = () => {
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
                    gridTemplateColumns: "auto auto auto"
                }}>
                    {
                        <InputComponent
                            title="Senha"
                        />
                    }
                    <Box sx={{
                        m: "15px"
                    }}
                    />
                    {
                        <InputComponent
                            title="Confirmar senha"
                        />
                    }
                </Box>
                {
                    <ButtonComponent
                        title="Cadastrar"
                    />
                }
            </BoxComponent>
        </>
    );
}