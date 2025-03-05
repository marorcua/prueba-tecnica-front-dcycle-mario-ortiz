import { ChartComponent, CombinedChart } from '../components/ChartComponent';
import { Toast } from '../components/Toast';
import DateSelector from '../components/DateSelector';
import useFetchCovidData from '../hooks/useFetchCovidData';
import ZoomableChart from '../components/ChartTest';
import { useState } from 'react';
import { byString, convertToChartData, normalizeCamelCase } from '../lib';

const metrics: Record<string, string> = {
  dailyCases: 'cases.total.calculated.change_from_prior_day',
  accumulatedCases: 'cases.total.value',
  dailyDeaths: 'outcomes.death.total.calculated.change_from_prior_day',
  accumulatedDeaths: 'outcomes.death.total.value',
  dailyHospitalized:
    'outcomes.hospitalized.total.calculated.change_from_prior_day',
  accumulatedHospitalized: 'cases.hospitalized.total.value',
  dailyTesting: 'testing.total.calculated.change_from_prior_day',
  accumulatedTesting: 'testing.total.value',
};

function CovidDashboard() {
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([]);
  const [axis1Metrics, setAxis1Metrics] = useState<string[]>([]);
  const [axis2Metrics, setAxis2Metrics] = useState<string[]>([]);
  const {
    data: filteredData,
    minDate,
    maxDate,
    endDate,
    error,
    setEndDate,
    setStartDate,
    startDate,
  } = useFetchCovidData();

  const filteredArray = (arr: string[]) => {
    if (arr.length === 0) return [];
    const dataToShow = arr.map((metric) => ({
      [metric]: filteredData.map((e) => byString(e, metrics[metric])),
    }));
    console.log(dataToShow);
    return dataToShow;
  };

  const labels = filteredData?.map((entry) => entry.date + '');

  const handleDrop = (metric: string, axis: number) => {
    console.log({ metric, axis });

    if (axis === 1) {
      setAxis1Metrics((prev) => [...new Set([...prev, metric])]);
      setAxis2Metrics((prev) => prev.filter((m) => m !== metric));
    } else {
      setAxis2Metrics((prev) => [...new Set([...prev, metric])]);
      setAxis1Metrics((prev) => prev.filter((m) => m !== metric));
    }
  };

  return (
    <div className="w-[-webkit-fill-available] rounded-2xl bg-gray-100 p-8">
      <h1 className="mb-8 text-center text-3xl font-bold">
        COVID-19 Data Dashboard
      </h1>
      <div className="mb-6 flex justify-center gap-4">
        <DateSelector
          value={startDate || minDate}
          min={minDate + ''}
          max={maxDate + ''}
          action={setStartDate}
          title="Start Date"
        />
        <DateSelector
          value={endDate || maxDate}
          min={minDate + ''}
          max={maxDate + ''}
          action={setEndDate}
          title="End Date"
        />
      </div>
      <h2 className="m-auto px-2 py-4 text-center text-3xl">
        Drag the following buttons to the axis!!!
      </h2>
      <div className="mb-4 flex flex-wrap gap-2">
        {Object.keys(metrics).map((metric: string) => (
          <button
            key={metric}
            draggable
            onDragStart={(e) => e.dataTransfer.setData('metric', metric)}
            onClick={() =>
              selectedMetrics.includes(metric)
                ? setSelectedMetrics(
                    selectedMetrics.filter((e) => e !== metric)
                  )
                : setSelectedMetrics([...selectedMetrics, metric])
            }
            className={`px-4 py-2 text-sm ${selectedMetrics.includes(metric) ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {normalizeCamelCase(metric)}
          </button>
        ))}
      </div>
      <div className="mb-4 flex justify-between gap-4">
        <div
          className="min-h-[50px] w-1/2 rounded-md border bg-gray-100 p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e.dataTransfer.getData('metric'), 1)}
        >
          <h3 className="font-bold">Axis 1</h3>
          {axis1Metrics.map((metric) => (
            <p
              key={metric}
              className={`m-4 inline-block bg-gray-200 px-4 py-2 text-sm`}
            >
              {metric}
            </p>
          ))}
        </div>
        <div
          className="min-h-[50px] w-1/2 rounded-md border bg-gray-100 p-4"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e.dataTransfer.getData('metric'), 2)}
        >
          <h3 className="font-bold">Axis 2</h3>
          {axis2Metrics.map((metric) => (
            <p
              key={metric}
              className={`m-4 inline-block bg-gray-200 px-4 py-2 text-sm`}
            >
              {metric}
            </p>
          ))}
        </div>
      </div>
      <section className="3xl:grid-cols-2 grid grid-cols-1 gap-4">
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <ZoomableChart
            data={[
              ...convertToChartData(filteredArray(axis1Metrics), 1),
              ...convertToChartData(filteredArray(axis2Metrics), 2),
            ]}
            labels={labels}
          />
        </div>
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <ChartComponent
            data={filteredData}
            labels={labels}
            title="COVID-19 Cases and Recovered Over Time"
            type="cases-recovered"
          />
        </div>
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <ChartComponent
            data={filteredData}
            labels={labels}
            title="COVID-19 Testing from prior day vs hospitalized vs cases changed"
            type="testing-outcomes"
          />
        </div>
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <ChartComponent
            data={filteredData}
            labels={labels}
            title="COVID-19 Cases and Recovered Over Time"
            type="hospitalized-states"
          />
        </div>
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <CombinedChart
            data={filteredData}
            labels={labels}
            title="COVID-19 Hospitalized vs deaths"
            type="hospitalized-deaths"
          />
        </div>
      </section>
      {error && <Toast message={error} />}
    </div>
  );
}

export default CovidDashboard;
