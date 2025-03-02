import { Line, Chart } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { CovidData } from '../types';
import { DataType, obtainDataSets } from './ChartDataConfiguration';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface ChartComponentProps {
  data: CovidData[];
  labels: string[];
  title: string;
  type: DataType;
}

export const ChartComponent = ({
  data,
  labels,
  title,
  type,
}: ChartComponentProps) => {
  const chartData = {
    labels,
    datasets: obtainDataSets(data, type),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
        },
        grid: {
          drawOnChartArea: false, // Only show grid for the left y-axis
        },
      },
      y2: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
        },
        grid: {
          drawOnChartArea: false, // Only show grid for the right y-axis
        },
      },
    },
  };

  return <Line data={chartData} options={options} className="m-4" />;
};

export const CombinedChart = ({ data }: ChartComponentProps) => {
  // Prepare the chart data
  const chartData = {
    labels: data.map((entry) => entry.date), // X-axis labels (dates)
    datasets: [
      {
        type: 'bar' as const, // Stacked bar for ICU
        label: 'ICU Patients',
        data: data.map(
          (entry) => entry.outcomes.hospitalized.in_icu.currently.value
        ),
        backgroundColor: 'rgba(255, 99, 132, 0.6)', // Red
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
        stack: 'Stack 0', // Stack with Ventilator
      },
      {
        type: 'bar' as const, // Stacked bar for Ventilator
        label: 'Ventilator Patients',
        data: data.map(
          (entry) => entry.outcomes.hospitalized.on_ventilator.currently.value
        ),
        backgroundColor: 'rgba(54, 162, 235, 0.6)', // Blue
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
        stack: 'Stack 0', // Stack with ICU
      },
      {
        type: 'line' as const, // Line for Cases Change
        label: 'Cases Change from Prior Day',
        data: data.map(
          (entry) => entry.cases.total.calculated.change_from_prior_day
        ),
        borderColor: 'rgba(75, 192, 192, 1)', // Teal
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderWidth: 2,
        yAxisID: 'y2', // Use a separate y-axis
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'COVID-19 Hospitalization and Cases Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y1: {
        type: 'linear' as const,
        display: true,
        position: 'left' as const,
        title: {
          display: true,
          text: 'Hospitalization',
        },
        stack: 'Stack 0', // Stacked bar scale
      },
      y2: {
        type: 'linear' as const,
        display: true,
        position: 'right' as const,
        title: {
          display: true,
          text: 'Cases Change',
        },
        grid: {
          drawOnChartArea: false, // Only show grid for the left y-axis
        },
      },
    },
  };

  return (
    <Chart type="bar" data={chartData} options={options} className="m-4" />
  );
};
