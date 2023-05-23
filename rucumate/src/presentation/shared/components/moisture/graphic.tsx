import ReactEcharts from 'echarts-for-react';

function GraphicComponent() {
  const option = {
    xAxis: {
      type: 'category',
      data: ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom']
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        show: false
      }
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260],
        type: 'line',
        lineStyle: {
            color: '#00960A'
        },
        itemStyle: {
            color: '#00960A'
        }
      }
    ],
    tooltip: {
        trigger: 'axis'
    }
  };

  return (
    <ReactEcharts
        option={option}
        className='graphic'
    />
  );
}

export default GraphicComponent;