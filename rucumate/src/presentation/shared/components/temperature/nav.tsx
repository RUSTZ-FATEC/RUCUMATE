function NavComponent(props: any) {
    return (
        <nav className="nav-container">
            <li className="nav-content">
                <img src={props.logo} alt="..." className="nav-icon-test-1" />
                <a href={props.navicon1}>
                    <img src={props.icon1} alt="..." className="nav-icon" />
                </a>
                <a href={props.navicon2}>
                    <img src={props.icon2} alt="..." className="nav-icon" />
                </a>
                <a href={props.navicon3}>
                    <img src={props.icon3} alt="..." className="nav-icon" />
                </a>
                <a href={props.navicon4}>
                    <img src={props.icon4} alt="..." className="nav-icon" />
                </a>
                <img src={props.icon5} alt="..." className="nav-icon-test-2" />
            </li>
        </nav>
    );
}

export default NavComponent;