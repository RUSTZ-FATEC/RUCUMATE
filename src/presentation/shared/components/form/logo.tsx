interface LogoComponentProps {
    logo: string;
}

function LogoComponent(props: LogoComponentProps) {
    return(
        <>
            <img src={props.logo} alt="..." className='logo' />
        </>
    );
}

export default LogoComponent;