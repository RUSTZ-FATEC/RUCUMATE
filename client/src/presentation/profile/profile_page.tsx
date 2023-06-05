import NavComponent from '../shared/components/home/nav';

import Logo from '../../assets/images/logo.svg';
import MoistureIcon from '../../assets/images/icons/moisture.svg';
import TemperatureIcon from '../../assets/images/icons/temperature.svg';
import NotificationIcon from '../../assets/images/icons/notification.svg';
import ProfileIcon from '../../assets/images/icons/profile.svg';
import LogoutIcon from '../../assets/images/icons/logout.svg';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import ButtonComponent from '../shared/components/form/button';

export const ProfileComponent: React.FC = () => {

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
                    <ButtonComponent
                        title="Atualizar"
                    />
                }
            </BoxComponent>
        </>
    );
}