import * as React from 'react';

import Logo from '../../assets/images/logo.svg';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import LogoComponent from '../shared/components/form/logo';
import InputComponent from '../shared/components/form/input';
import ButtonComponent from '../shared/components/form/button';

export const SinginComponent: React.FC = () => {
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
                    />
                }
                {
                    <ButtonComponent
                        title="Entrar"
                    />
                }
            </BoxComponent>
        </>
    );
}