import Box from '@mui/material/Box';

import Logo from '../../assets/images/logo.svg';

import BoxComponent from '../shared/components/form/box';
import TitleComponent from '../shared/components/form/title';
import LogoComponent from '../shared/components/form/logo';
import ButtonComponent from '../shared/components/form/button';
import AccountComponent from '../shared/components/form/account';

export const SignupComponent: React.FC = () => {

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
                    <ButtonComponent
                        title="Cadastrar"
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
                            title="Já possui uma conta cadastrada?"
                            title_link="Login"
                            href="/"
                        />
                    }
                </Box>
            </BoxComponent>
        </>
    );
}