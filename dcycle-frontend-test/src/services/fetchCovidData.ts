import { API_URL } from './fetchData';

export const fetchCovidData = async () => {
  try {
    const result = await fetch(API_URL + '/api/covid/historical');
    const data = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
