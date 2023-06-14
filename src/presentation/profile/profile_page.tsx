import NavComponent from '../shared/components/home/nav';

import Logo from '../../assets/images/logo.svg';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import ButtonComponent from '../shared/components/form/button';

export const ProfileComponent: React.FC = () => {

    return (
        <>
            <NavComponent
                logo={Logo}
                navicon1='/umidade'
                navicon2='/temperatura'
                navicon3='/notificacao'
                navicon4='/perfil'
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