import { Line } from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
import ChartSkeleton from './ChartSkeleton';

Chart.register(...registerables);
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
