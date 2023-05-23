import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GraphicComponent = () => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        xAxis: {
          type: 'category',
          data: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            itemStyle: {
              color: '#D6E1E0'
            },
          }
        ],
        tooltip: {
          trigger: 'axis'
        }
      };

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
  }, []);

  return <div ref={chartRef} style={{ width: '100%', height: '400px' }} />;
};

export default GraphicComponent;