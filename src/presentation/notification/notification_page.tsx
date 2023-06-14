import React, { useEffect, useState } from 'react';
import NavComponent from '../shared/components/home/nav';

import Logo from '../../assets/images/logo.svg';

import TitleComponent from '../shared/components/form/title';

import '../shared/style/main.css';

export const NotificationComponent: React.FC = () => {
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`);
                const data = await response.json();

                const newNotifications: any = [];

                // Check temperature and humidity fields
                data.forEach(async (entry: any) => {
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

    const sendNotification = async (content: string, user_id: any) => {
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
                navicon2="/temperatura"
                navicon3="/notificacao"
                navicon4="/perfil"
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
