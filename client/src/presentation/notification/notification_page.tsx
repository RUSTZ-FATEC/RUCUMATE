import React, { useEffect, useState } from 'react';
import NavComponent from '../shared/components/home/nav';

import Logo from '../../assets/images/logo.svg';
import MoistureIcon from '../../assets/images/icons/moisture.svg';
import TemperatureIcon from '../../assets/images/icons/temperature.svg';
import NotificationIcon from '../../assets/images/icons/notification.svg';
import ProfileIcon from '../../assets/images/icons/profile.svg';
import LogoutIcon from '../../assets/images/icons/logout.svg';

import TitleComponent from '../shared/components/form/title';

import '../shared/style/main.css';

export const NotificationComponent: React.FC = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id'); // Obter o user_id armazenado localmente
                const response = await fetch(`https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`);
                const data = await response.json();

                const newNotifications = [];

                // Check temperature and humidity fields
                data.forEach(async (entry) => {
                    if (entry.temperature > 39) {
                        if (entry.temperature >= 49) {
                            const content = `O sensor ${entry.id} detectou que a temperatura está no limite máximo suportado pela planta ${entry.temperature}°C!`;
                            newNotifications.push(content);

                            await sendNotification(content, user_id);
                        } else {
                            const content = `O sensor ${entry.id} detectou que a temperatura está ficando alta ${entry.temperature}°C!`;
                            newNotifications.push(content);

                            await sendNotification(content, user_id);
                        }
                    }

                    if (entry.temperature < 16) {
                        const content = `O sensor ${entry.id} detectou que a temperatura está abaixo da mínima necessária para o desenvolvimento com a planta ${entry.temperature}°C.`;
                        newNotifications.push(content);

                        await sendNotification(content, user_id);
                    }

                    if (entry.humidity < 20) {
                        const content = `O sensor ${entry.id} detectou que a umidade está baixa ${entry.humidity}%.`;
                        newNotifications.push(content);

                        await sendNotification(content, user_id);
                    } else if (entry.humidity > 60) {
                        const content = `O sensor ${entry.id} detectou que a umidade está muito alta ${entry.humidity}%.`;
                        newNotifications.push(content);

                        await sendNotification(content, user_id);
                    }
                });

                setNotifications(newNotifications);
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    const sendNotification = async (content, user_id) => {
        try {
            await fetch('https://rucumate.herokuapp.com/notification/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    content,
                    user_id
                })
            });
        } catch (error) {
            console.log('Error sending notification:', error);
        }
    };

    return (
        <>
            <NavComponent
                logo={Logo}
                navicon1="/umidade"
                icon1={MoistureIcon}
                navicon2="/temperatura"
                icon2={TemperatureIcon}
                navicon3="/notificacao"
                icon3={NotificationIcon}
                navicon4="/perfil"
                icon4={ProfileIcon}
                logout={LogoutIcon}
            />
            <div className="notification-page">
                <TitleComponent title="Notificações" />

                <div className="notification-container">
                    {notifications.map((notification, index) => (
                        <div key={index} className="notification">
                            {notification}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};
