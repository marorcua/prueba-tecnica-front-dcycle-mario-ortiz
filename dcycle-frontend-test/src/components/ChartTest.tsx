import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

const ZoomableChart = ({ labels, data }: { labels: string[] }) => {
  const chartData = {
    labels,
    datasets: data?.map((e) => ({
      label: Object.keys(e)[0],
      data: Object.values(e)[0],
    })),
  };
  const options = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          pinch: {
            enabled: true,
          },
          mode: 'x',
        },
      },
    },
  };

  return (
    <div className="mx-auto w-full max-w-4xl rounded-lg bg-white p-4 shadow-lg">
      <h2 className="mb-4 text-center text-xl font-bold">Gráfica Zoomable</h2>
      {chartData?.datasets?.length > 0 && (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default ZoomableChart;
