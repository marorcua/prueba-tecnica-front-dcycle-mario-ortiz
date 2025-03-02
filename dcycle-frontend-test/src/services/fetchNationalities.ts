import { CountryResults } from '../types';
import { API_URL } from './fetchData';

export const fetchNationalities = async ({ name }: { name: string }) => {
  try {
    const endpoint = API_URL + '/api/nationalize/' + name;
    const result = await fetch(endpoint);
    const data: CountryResults = await result.json();

    return data;
  } catch (error) {
    console.log(error);
  }
};
