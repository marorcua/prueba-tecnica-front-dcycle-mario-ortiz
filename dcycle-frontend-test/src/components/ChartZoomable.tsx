import { Line } from 'react-chartjs-2';
import { Chart, ChartOptions, registerables, scales } from 'chart.js';
import ChartSkeleton from './ChartSkeleton';
import zoomPlugin from 'chartjs-plugin-zoom';

Chart.register(...registerables, zoomPlugin);
export type Data = {
  label: string;
  data: (Record<string, any> | undefined)[];
  yAxisID: string;
};

const ZoomableChart = ({
  labels,
  data,
}: {
  labels: string[];
  data: Data[];
}) => {
  const chartData = {
    labels,
    datasets: data,
  };
  const options: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          drag: {
            enabled: true,
          },
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
    scales: {
      x: {
        grid: {
          drawOnChartArea: false,
        },
      },
      y1: {
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="">
      <h2 className="mb-4 text-center text-xl font-bold">Gráfica Dinámica</h2>
      {chartData?.datasets?.length > 0 ? (
        <Line data={chartData} options={options} />
      ) : (
        <div className="h-[504px]">
          <ChartSkeleton />
        </div>
      )}
    </div>
  );
};

export default ZoomableChart;
