import * as React from 'react';
import NavComponent from '../shared/components/moisture/nav';
import GraphicComponent from '../shared/components/moisture/graphic';
import CarouselComponent from '../shared/components/moisture/carousel';

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
                navicon3='#'
                icon3={NotificationIcon}
                navicon4='#'
                icon4={ProfileIcon}
                icon5={LogoutIcon}
            />
            <GraphicComponent />
            <CarouselComponent
                title='Informações dos sensores:'
            />
            <br />
        </>
    );
}