import * as React from 'react';
import NavComponent from '../shared/components/home/nav';
import GraphicComponent from '../shared/components/home/graphic';
import CarouselComponent from '../shared/components/home/carousel';

import Logo from '../../assets/images/logo.svg';

export const MoistureComponent: React.FC = () => {

    return (
        <>
            <NavComponent
                logo={Logo}
                navicon1='/umidade'
                navicon2='/temperatura'
                navicon3='/notificacao'
                navicon4='/perfil'
            />
            <GraphicComponent />
            <CarouselComponent
                title='Informações de umidade dos sensores:'
            />
        </>
    );
}