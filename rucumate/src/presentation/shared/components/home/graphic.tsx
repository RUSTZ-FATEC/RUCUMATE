import React, { useEffect, useRef } from 'react';
import * as echarts from 'echarts';

const GraphicComponent = (props: { data1: any; data2: any; }) => {
  const { data1, data2 } = props;
  const chartRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      const chart = echarts.init(chartRef.current);

      const option = {
        xAxis: {
          type: 'category',
          data: data1
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            show: false
          }
        },
        series: [
          {
            data: data2,
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

  return (
    <>
      <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
    </>
  );
};

export default GraphicComponent;