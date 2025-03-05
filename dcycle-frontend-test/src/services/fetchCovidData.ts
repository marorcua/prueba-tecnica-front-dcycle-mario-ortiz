import { CovidResults } from '../types';
import { API_URL } from './fetchData';

export function transformApiResponse<T>(rawData: CovidResults): T {
  return rawData as T;
}

export const fetchCovidData = async () => {
  try {
    const result = await fetch(API_URL + '/api/covid/historical');
    const data = await result.json();

    return transformApiResponse(data);
  } catch (error) {
    console.log(error);
  }
};
