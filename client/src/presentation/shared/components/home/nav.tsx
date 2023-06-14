import React, { useState } from 'react';
import { IconButton, Drawer } from '@mui/material';
import { Menu } from '@mui/icons-material';
import Box from '@mui/material/Box';

function NavComponent(props: any) {
    const [isOpen, setIsOpen] = useState(false);
    const [hasNotifications, setHasNotifications] = useState(false);
    
    const handleDrawerToggle = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <IconButton
                color="inherit"
                aria-label="menu"
                edge="start"
                onClick={handleDrawerToggle}
                disableRipple
                sx={{ position: 'fixed', top: '0', left: '15px', zIndex: 999, color: '#D6E1E0' }}
            >
                <Menu />
            </IconButton>
            <Drawer
                anchor="left"
                open={isOpen}
                onClose={handleDrawerToggle}
                PaperProps={{
                    style: {
                        boxShadow: 'none',
                        backgroundColor: '#100F10',
                        borderRadius: '0 25px 25px 0'
                    }
                }}
            >
                <Box
                    sx={{
                        m: '5px',
                        height: '100vh',
                        display: 'grid',
                        placeItems: 'center',
                        placeContent: 'center'
                    }}
                >
                    <img
                        src={props.logo}
                        alt="..."
                        style={{
                            top: '10px',
                            margin: '10px',
                            height: '35px',
                            position: 'fixed'
                        }}
                    />
                    <a href={props.navicon1}>
                        <img
                            src={props.icon1}
                            alt="..."
                            className="nav-icon"
                        />
                    </a>
                    <a href={props.navicon2}>
                        <img
                            src={props.icon2}
                            alt="..."
                            className={`nav-icon ${hasNotifications ? 'has-notifications' : ''}`}
                        />
                    </a>
                    <a href={props.navicon3}>
                        <img
                            src={props.icon3}
                            alt="..."
                            className="nav-icon"
                        />
                    </a>
                    <a href={props.navicon4}>
                        <img
                            src={props.icon4}
                            alt="..."
                            className="nav-icon"
                        />
                    </a>
                    <button
                        style={{
                            bottom: '10px',
                            margin: '10px',
                            border: 'none',
                            cursor: 'pointer',
                            position: 'fixed',
                            background: 'none'
                        }}
                        onClick={() => {
                            window.localStorage.clear();
                            window.location.href = "/";
                        }}
                    >
                        <img
                            src={props.logout}
                            alt="..."
                        />
                    </button>
                </Box>
            </Drawer>
        </>
    );
}

export default NavComponent;