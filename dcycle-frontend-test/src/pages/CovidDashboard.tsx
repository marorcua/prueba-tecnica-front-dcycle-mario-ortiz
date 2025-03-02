import { useEffect, useMemo, useState } from 'react';
import { fetchCovidData } from '../services/fetchCovidData';
import { ChartComponent, CombinedChart } from '../components/ChartComponent';
import { Toast } from '../components/Toast';
import { CovidData } from '../types';
import DateSelector from '../components/DateSelector';

function CovidDashboard() {
  const [covidData, setCovidData] = useState<CovidData[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    async function fetchData() {
      try {
        const abort = new AbortController();
        const response = await fetchCovidData();
        setCovidData(response.data);
        return () => {
          abort.abort();
        };
      } catch (error) {
        console.log(error);
        setError('Could not retrieve data from server');
      }
    }
    fetchData();
  }, []);
  const { maxDate, minDate } = useMemo(() => {
    const orderedData = covidData.toSorted(
      (a, b) => new Date(b.date).valueOf() - new Date(a.date).valueOf()
    );
    return {
      maxDate: orderedData[0]?.date + '',
      minDate: orderedData.pop()?.date + '',
    };
  }, [covidData]);

  const filteredData = useMemo(
    () =>
      covidData
        .filter(
          (info) =>
            new Date(info.date) <= new Date(endDate || maxDate) &&
            new Date(info.date) >= new Date(startDate || minDate)
        )
        .toSorted(
          (a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf()
        ),
    [covidData, endDate, startDate, maxDate, minDate]
  );

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
      <section className="3xl:grid-cols-2 grid grid-cols-1 gap-4">
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <ChartComponent
            data={filteredData}
            labels={filteredData.map((entry) => entry.date + '')}
            title="COVID-19 Cases and Recovered Over Time"
            type="cases-recovered"
          />
        </div>
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <ChartComponent
            data={filteredData}
            labels={filteredData.map((entry) => entry.date + '')}
            title="COVID-19 Testing from prior day vs hospitalized vs cases changed"
            type="testing-outcomes"
          />
        </div>
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <ChartComponent
            data={filteredData}
            labels={filteredData.map((entry) => entry.date + '')}
            title="COVID-19 Cases and Recovered Over Time"
            type="hospitalized-states"
          />
        </div>
        <div className="mt-4 max-w-[100%] rounded-lg bg-white p-6 shadow-lg">
          <CombinedChart
            data={filteredData}
            labels={filteredData.map((entry) => entry.date + '')}
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
