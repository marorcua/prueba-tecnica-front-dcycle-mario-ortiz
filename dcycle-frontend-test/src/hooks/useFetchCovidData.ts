import { useEffect, useMemo, useState } from 'react';
import { CovidData } from '../types';
import { fetchCovidData } from '../services/fetchCovidData';

function useFetchCovidData() {
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

  return {
    data: filteredData,
    startDate,
    endDate,
    error,
    minDate,
    maxDate,
    setStartDate,
    setEndDate,
  };
}

export default useFetchCovidData;
