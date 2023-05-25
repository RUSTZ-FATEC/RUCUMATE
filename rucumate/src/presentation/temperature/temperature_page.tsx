import * as React from 'react';
import NavComponent from '../shared/components/nav';

import Logo from '../../assets/images/logo.svg';
import MoistureIcon from '../../assets/images/icons/moisture.svg';
import TemperatureIcon from '../../assets/images/icons/temperature.svg';
import NotificationIcon from '../../assets/images/icons/notification.svg';
import ProfileIcon from '../../assets/images/icons/profile.svg';
import LogoutIcon from '../../assets/images/icons/logout.svg';

import ContainerComponent from '../shared/components/container';

import GraphicComponent from '../shared/components/home/graphic';
import TitleComponent from '../shared/components/title';
import CarouselComponent from '../shared/components/home/carousel';
import ListComponent from '../shared/components/list';

export const TemperatureComponent: React.FC = () => {

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
            <ContainerComponent>
                <GraphicComponent
                    data1={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
                    data2={[120, 200, 150, 80, 70, 110, 130]}
                />
                <TitleComponent
                    title='Informações dos sensores'
                />
                <CarouselComponent />
                <TitleComponent
                    title='Últimas atualizações'
                />
                <ListComponent />
            </ContainerComponent>
        </>
    );
}