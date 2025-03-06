import { ChartComponent, CombinedChart } from '../components/ChartComponent';
import { Toast } from '../components/Toast';
import DateSelector from '../components/DateSelector';
import useFetchCovidData from '../hooks/useFetchCovidData';
import ZoomableChart, { Data } from '../components/ChartZoomable';
import { useState } from 'react';
import DraggableComponent from '../components/DraggableComponent';

function CovidDashboard() {
  const [selectedData, setSelectedData] = useState<Data[]>([]);
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

  const labels = filteredData?.map((entry) => entry.date + '');

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
      <DraggableComponent
        filteredData={filteredData}
        setSelectedData={setSelectedData}
      />
      <section className="3xl:grid-cols-2 grid grid-cols-1 gap-4">
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <ZoomableChart data={selectedData} labels={labels} />
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
