import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GraphicComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const endpoint = window.location.href;
        let seriesData = [];
        const user_id = localStorage.getItem('user_id'); // Obter o user_id armazenado localmente

        if (endpoint.endsWith('temperatura')) {
          const response = await fetch(`https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`);
          const data = await response.json();
          seriesData = data.map((entry) => entry.temperature);
        } else if (endpoint.endsWith('umidade')) {
          const response = await fetch(`https://rucumate.herokuapp.com/esp/data/id/user/${user_id}`);
          const data = await response.json();
          seriesData = data.map((entry) => entry.humidity);
        }

        if (chartRef.current) {
          const chart = echarts.init(chartRef.current);

          const xAxisData = []; // Defina os dados apropriados para o eixo x

          const option = {
            xAxis: {
              type: 'category',
              data: xAxisData,
            },
            yAxis: {
              type: 'value',
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
                name: 'Linha Pontilhada',
                type: 'line',
                symbol: 'none',
                lineStyle: {
                  type: 'dashed',
                  color: 'red',
                },
                markLine: {
                  data: [
                    { yAxis: 20, lineStyle: { color: 'red' } }, // Valor mínimo (inferior)
                    { yAxis: 60, lineStyle: { color: 'red' } }, // Valor máximo (superior)
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
              { yAxis: 16, lineStyle: { color: 'red' } }, // Valor mínimo (inferior)
              { yAxis: 34, lineStyle: { color: 'red' } }, // Valor máximo (superior)
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
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default GraphicComponent;
