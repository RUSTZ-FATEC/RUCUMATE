import React, { useEffect, useState } from 'react';
import Logo from '../../assets/images/logo.svg';

export const NotificationComponent: React.FC = () => {
    const [notifications, setNotifications] = useState<string[]>([]);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user_id = localStorage.getItem('user_id');
                const response = await fetch(`https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`);
                const data = await response.json();

                const newNotifications: string[] = [];
                const temperatureList: number[] = [];
                const humidityList: number[] = [];

                data.forEach(async (entry: any) => {
                    temperatureList.push(entry.temperature);
                    humidityList.push(entry.humidity);
                });

                // Remove duplicate values from the temperature and humidity lists
                const uniqueTemperatures = [...new Set(temperatureList)];
                const uniqueHumidity = [...new Set(humidityList)];

                uniqueTemperatures.forEach(async (temperature: number) => {
                    if (temperature > 39) {
                        if (temperature >= 49) {
                            const content = `A temperatura está no limite máximo suportado pela planta: ${temperature}°C!`;
                            newNotifications.push(content);
                            await sendNotification(content, user_id);
                        } else {
                            const content = `A temperatura está ficando alta: ${temperature}°C!`;
                            newNotifications.push(content);
                            await sendNotification(content, user_id);
                        }
                    }

                    if (temperature < 16) {
                        const content = `A temperatura está abaixo da mínima necessária para o desenvolvimento com a planta: ${temperature}°C.`;
                        newNotifications.push(content);
                        await sendNotification(content, user_id);
                    }
                });

                uniqueHumidity.forEach(async (humidity: number) => {
                    if (humidity < 20) {
                        const content = `A umidade está baixa: ${humidity}%.`;
                        newNotifications.push(content);
                        await sendNotification(content, user_id);
                    } else if (humidity > 60) {
                        const content = `A umidade está muito alta: ${humidity}%.`;
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
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    content,
                    user_id,
                }),
            });
        } catch (error) {
            console.log('Error sending notification:', error);
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="flex items-center justify-between mx-auto w-full max-w-7xl p-3 absolute top-0 left-0 right-0 z-10">
                <div className="flex lg:flex-1">
                    <img className="h-8 w-auto" src={Logo} alt="..." />
                </div>
                <div className="flex lg:hidden">
                    <button type="button" onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                        )}
                    </button>
                </div>
                <div className={`hidden lg:flex lg:gap-x-6 ${isMenuOpen ? 'block' : 'hidden'}`}>
                    <a href='/umidade' className="font-semibold text-white cursor-pointer border-b-2 border-transparent transition-all duration-150 hover:border-gray-500">Úmidade</a>
                    <a href='/temperatura' className="font-semibold text-white cursor-pointer border-b-2 border-transparent transition-all duration-150 hover:border-gray-500">Temperatura</a>
                    <a href='/notificacao' className="font-semibold text-white cursor-pointer border-b-2 border-transparent transition-all duration-150 hover:border-gray-500">Notificações</a>
                </div>
                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <button type='button' onClick={() => {
                        window.localStorage.clear();
                        window.location.href = "/";
                    }}>
                        <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.375 0V3.24675H21.875V19.4805H9.375V22.7273H25V0H9.375ZM6.25 6.49351L0 11.3636L6.25 16.2338V12.987H18.75V9.74026H6.25V6.49351Z" fill='#FFFFFF' />
                        </svg>
                    </button>
                </div>
            </nav>
            <div className={`${isMenuOpen ? 'block' : 'hidden'} lg:hidden`}>
                <div className="w-full px-6 mt-10">
                    <div className="divide-y divide-white">
                        <div className="py-6">
                            <a href='/umidade' className="block rounded-lg px-3 py-2 font-semibold text-white cursor-pointer transition-all duration-150 hover:bg-gray-500">Úmidade</a>
                            <a href='/temperatura' className="block rounded-lg px-3 py-2 font-semibold text-white cursor-pointer transition-all duration-150 hover:bg-gray-500">Temperatura</a>
                            <a href='/notificacao' className="block rounded-lg px-3 py-2 font-semibold text-white cursor-pointer transition-all duration-150 hover:bg-gray-500">Notificações</a>
                        </div>
                        <div className="py-6">
                            <button type='button' onClick={() => {
                                window.localStorage.clear();
                                window.location.href = "/";
                            }} className="px-3 py-2">
                                <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M9.375 0V3.24675H21.875V19.4805H9.375V22.7273H25V0H9.375ZM6.25 6.49351L0 11.3636L6.25 16.2338V12.987H18.75V9.74026H6.25V6.49351Z" fill='#FFFFFF' />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex items-center justify-center mx-auto w-full max-w-7xl h-screen'>
                <div className="flex flex-col items-center p-5">
                    <h1 className='text-white text-center font-bold text-2xl'>Notificações</h1>
                    {notifications.length > 0 ? (
                        <div className="w-full max-w-xl mt-5">
                            {notifications.map((notification, index) => (
                                <div key={index} className="bg-[#202124] text-white text-justify rounded-lg p-4 mb-2.5">
                                    <div className='flex flex-row items-center gap-5'>
                                        <div>
                                            <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M18.6667 9.33333H9.33333V18.6667H18.6667V9.33333ZM15.5556 15.5556H12.4444V12.4444H15.5556V15.5556ZM28 12.4444V9.33333H24.8889V6.22222C24.8889 4.51111 23.4889 3.11111 21.7778 3.11111H18.6667V0H15.5556V3.11111H12.4444V0H9.33333V3.11111H6.22222C4.51111 3.11111 3.11111 4.51111 3.11111 6.22222V9.33333H0V12.4444H3.11111V15.5556H0V18.6667H3.11111V21.7778C3.11111 23.4889 4.51111 24.8889 6.22222 24.8889H9.33333V28H12.4444V24.8889H15.5556V28H18.6667V24.8889H21.7778C23.4889 24.8889 24.8889 23.4889 24.8889 21.7778V18.6667H28V15.5556H24.8889V12.4444H28ZM21.7778 21.7778H6.22222V6.22222H21.7778V21.7778Z" fill="white" />
                                            </svg>
                                        </div>
                                        {notification}
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center justify-center text-center rounded-xl bg-[#202124] gap-2 p-2 px-5 m-5">
                            <div className='flex items-center justify-center rounded-full bg-[#404041] p-2'>
                                <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                    stroke="currentColor" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                                </svg>
                            </div>
                            <div>
                                <span className='text-white'>Não há notificações para exibir.</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
