import * as React from 'react';
import NavComponent from '../shared/components/nav/nav';
import GraphicComponent from '../shared/components/home/graphic';
import CarouselInfoComponent from '../shared/components/home/carousel_info';

import Logo from '../../assets/images/logo.svg';
import MoistureIcon from '../../assets/images/icons/moisture.svg';
import TemperatureIcon from '../../assets/images/icons/temperature.svg';
import NotificationIcon from '../../assets/images/icons/notification.svg';
import ProfileIcon from '../../assets/images/icons/profile.svg';
import LogoutIcon from '../../assets/images/icons/logout.svg';

export const MoistureComponent: React.FC = () => {

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
            <GraphicComponent
                data1={['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']}
                data2={[120, 200, 150, 80, 70, 110, 130]}
            />
            <CarouselInfoComponent
                title='Informações dos sensores:'
            />
        </>
    );
}