import React, { useEffect, useState, useRef } from 'react';
import Logo from '../../assets/images/logo.svg';
import * as echarts from 'echarts';

export const TemperatureComponent: React.FC = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const chartRef = useRef(null);

    interface ItemData {
        id: number;
        user_id: string;
        temperature: string;
        humidity: string;
    }

    const [slides, setSlides] = useState<ItemData[]>([]);
    const user_id = window.localStorage.getItem("user_id");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`
                );
                const data = await response.json();
                setSlides(data);
            } catch (error) {
                console.log("Error fetching data:", error);
            }

            // Gráfico
            try {
                const endpoint = window.location.href;
                let seriesData = [];
                const user_id = localStorage.getItem('user_id'); // Obter o user_id armazenado localmente

                if (endpoint.endsWith('temperatura')) {
                    const response = await fetch(`https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`);
                    const data = await response.json();
                    seriesData = data.map((entry: any) => entry.temperature);
                } else if (endpoint.endsWith('umidade')) {
                    const response = await fetch(`https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`);
                    const data = await response.json();
                    seriesData = data.map((entry: any) => entry.humidity);
                }

                if (chartRef.current) {
                    const chart = echarts.init(chartRef.current);

                    const option: any = {
                        xAxis: {
                            type: 'category',
                            data: seriesData,
                        },
                        yAxis: {
                            type: 'value',
                            axisLabel: {
                                formatter: '{value} °C'
                            }
                        },
                        series: [
                            {
                                data: seriesData,
                                type: 'bar',
                                showBackground: true,
                                backgroundStyle: {
                                    color: 'rgba(180, 180, 180, 0.2)',
                                },
                                itemStyle: {
                                    color: '#D6E1E0',
                                },
                            },
                            {
                                data: seriesData,
                                type: 'line',
                                symbol: 'none',
                                lineStyle: {
                                    // type: 'dashed',
                                    color: '#00960A',
                                    smooth: true
                                },
                                markLine: {
                                    data: [
                                        { yAxis: 20, lineStyle: { color: '#00960A' } }, // Valor mínimo (inferior)
                                        { yAxis: 90, lineStyle: { color: '#00960A' } }, // Valor máximo (superior)
                                    ],
                                },
                            },
                        ],
                        tooltip: {
                            trigger: 'axis',
                        },
                    };

                    // Verificar se é temperatura e ajustar os valores da linha pontilhada
                    if (endpoint.endsWith('temperatura')) {
                        option.series[1].markLine.data = [
                            { yAxis: 0, lineStyle: { color: '#00960A' } }, // Valor mínimo (inferior)
                            { yAxis: 50, lineStyle: { color: '#00960A' } }, // Valor máximo (superior)
                        ];
                    }

                    chart.setOption(option);

                    const resizeHandler = () => {
                        chart.resize();
                    };

                    window.addEventListener('resize', resizeHandler);

                    return () => {
                        window.removeEventListener('resize', resizeHandler);
                        chart.dispose();
                    };
                }
            } catch (error) {
                console.log('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user_id]);

    const getModelInfo = (slide: any) => {
        if (window.location.pathname === '/temperatura') {
            return slide.temperature;
        } else if (window.location.pathname === '/umidade') {
            return slide.humidity;
        } else {
            return "Modelo não especificado";
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
            <nav className="flex items-center justify-between mx-auto max-w-7xl p-3 absolute top-0 left-0 right-0 z-10">
                <div className="flex lg:flex-1">
                    <img className="h-8 w-auto" src={Logo} alt="..." />
                </div>
                <div className="flex lg:hidden">
                    <button type="button" onClick={toggleMenu}>
                        {isMenuOpen ? (
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="white" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        ) : (
                            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                stroke="white" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
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
            <div className='flex flex-col items-center justify-center mx-auto w-full max-w-3xl h-screen overflow-hidden'>
                {slides.length > 0 ? (
                    <div ref={chartRef} style={{ width: '100%', maxWidth: '700px', height: '400px' }} />
                ) : (
                    <div className="flex items-center justify-center rounded-xl bg-[#202124] gap-2 p-2 px-5 m-5">
                        <div className='flex items-center justify-center rounded-full bg-[#404041] p-2'>
                            <svg className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                                stroke="currentColor" aria-hidden="true">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                    d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
                            </svg>
                        </div>
                        <div>
                            <span className='text-white'>Não há dados relacionados à temperatura para exibir.</span>
                        </div>
                    </div>
                )}
                <div className='w-full h-28 overflow-auto'>
                    {slides.length > 0 ? (
                        slides.map((slide: ItemData) => (
                            <div className='flex flex-col bg-[#202124] text-white rounded-lg p-2.5 m-2.5'>
                                <span>ID: {slide.id}</span>
                                <span>Usuário {slide.user_id}</span>
                                <span>Temperatura: {getModelInfo(slide)}°C</span>
                            </div>
                        ))
                    ) : (
                        <></>
                    )}
                </div>
            </div>
        </>
    );
}